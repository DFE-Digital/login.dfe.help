const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const { doubleCsrf } = require("csrf-csrf");
const expressLayouts = require("express-ejs-layouts");
const http = require("http");
const https = require("https");
const path = require("path");
const helmet = require("helmet");
const sanitization = require("login.dfe.sanitization");
const {
  getErrorHandler,
  ejsErrorPages,
} = require("login.dfe.express-error-handling");
const flash = require("login.dfe.express-flash-2");

// imports for authentication
const passport = require("passport");
const getPassportStrategy = require("./infrastructure/oidc");
const { setUserContext } = require("./infrastructure/utils");
const mountRoutes = require("./routes");
const config = require("./infrastructure/config");
const logger = require("./infrastructure/logger");

const configSchema = require("./infrastructure/config/schema");
const { setupApi } = require("login.dfe.api-client/api/setup");

configSchema.validate();

setupApi({
  auth: {
    tenant: config.organisations.service.auth.tenant,
    authorityHostUrl: config.organisations.service.auth.authorityHostUrl,
    clientId: config.organisations.service.auth.clientId,
    clientSecret: config.organisations.service.auth.clientSecret,
    resource: config.organisations.service.auth.resource,
  },
  api: {
    organisations: {
      baseUri: config.organisations.service.url,
    },
    applications: {
      baseUri: config.applications.service.url,
    },
    access: {
      baseUri: config.access.service.url,
    },
  },
});

const init = async () => {
  https.globalAgent.maxSockets = http.globalAgent.maxSockets =
    config.hostingEnvironment.agentKeepAlive.maxSockets || 50;

  const app = express();

  logger.info("set helmet policy defaults");

  const self = "'self'";
  const allowedOrigin = "*.signin.education.gov.uk";

  if (config.hostingEnvironment.hstsMaxAge) {
    app.use(
      helmet({
        strictTransportSecurity: {
          maxAge: config.hostingEnvironment.hstsMaxAge,
          preload: true,
          includeSubDomains: true,
        },
      }),
    );
  }

  // Setting helmet Content Security Policy
  const scriptSources = [
    self,
    "'unsafe-inline'",
    "'unsafe-eval'",
    allowedOrigin,
  ];
  const styleSources = [self, "'unsafe-inline'", allowedOrigin];
  const imgSources = [self, "data:", "blob:", allowedOrigin];
  const fontSources = [self, "data:", allowedOrigin];
  const defaultSources = [self, allowedOrigin];

  if (config.hostingEnvironment.env === "dev") {
    scriptSources.push("localhost:*");
    styleSources.push("localhost:*");
    imgSources.push("localhost:*");
    fontSources.push("localhost:*");
    defaultSources.push("localhost:*");
  }

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: defaultSources,
          scriptSrc: scriptSources,
          styleSrc: styleSources,
          imgSrc: imgSources,
          fontSrc: fontSources,
          connectSrc: [self],
          formAction: [self, "*"],
        },
      },
      crossOriginOpenerPolicy: { policy: "unsafe-none" }, // crossOriginOpenerPolicy: false is ignored and unsafe-none is the default on MDM
    }),
  );

  logger.info("Set helmet filters");

  app.use(helmet.xssFilter());
  app.use(helmet.frameguard("false"));
  app.use(helmet.ieNoOpen());

  logger.info("helmet setup complete");

  let expiryInMinutes = 30;
  const sessionExpiry = parseInt(
    config.hostingEnvironment.sessionCookieExpiryInMinutes,
    10,
  );
  if (!isNaN(sessionExpiry)) {
    expiryInMinutes = sessionExpiry;
  }

  app.use(
    session({
      keys: [config.hostingEnvironment.sessionSecret],
      maxAge: expiryInMinutes * 60000, // Expiry in milliseconds
      httpOnly: true,
      secure: true,
    }),
  );

  app.use((req, res, next) => {
    req.session.now = Date.now();
    next();
  });

  const { doubleCsrfProtection: csrf } = doubleCsrf({
    getSecret: (req) => req.secret,

    getTokenFromRequest: (req) => req.body._csrf,
    secret: config.hostingEnvironment.csrfSecret,
    cookieName: `${config.hostingEnvironment.host}.x-csrf`,
    cookieOptions: {
      sameSite: "strict",
      secure: true,
      signed: true,
    },
    size: 64,
    ignoredMethods: ["GET", "HEAD", "OPTIONS"],
  });

  if (config.hostingEnvironment.env !== "dev") {
    app.set("trust proxy", 1);
  }

  // setting up authentication middleware
  passport.use("oidc", await getPassportStrategy());
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(setUserContext);
  // finished setting up authentication middleware

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser(config.hostingEnvironment.sessionSecret));
  app.use(sanitization());
  app.set("view engine", "ejs");
  app.use(express.static(path.resolve(__dirname, "dist")));
  app.use(expressLayouts);
  app.set("views", path.resolve(__dirname, "app"));
  app.set("layout", "shared/views/layout");
  app.use(flash());

  /*
    Addressing issue with latest version of passport dependency packge
    TypeError: req.session.regenerate is not a function
    Reference: https://github.com/jaredhanson/passport/issues/907#issuecomment-1697590189
  */
  app.use((request, response, next) => {
    if (request.session && !request.session.regenerate) {
      request.session.regenerate = (cb) => {
        cb();
      };
    }
    if (request.session && !request.session.save) {
      request.session.save = (cb) => {
        cb();
      };
    }
    next();
  });

  mountRoutes(app, csrf);

  let assetsUrl = config.assets.url;
  assetsUrl = assetsUrl.endsWith("/")
    ? assetsUrl.substr(0, assetsUrl.length - 1)
    : assetsUrl;
  Object.assign(app.locals, {
    urls: {
      interactions: config.hostingEnvironment.interactionsUrl,
      services: config.hostingEnvironment.servicesUrl,
      profile: config.hostingEnvironment.profileUrl,
      manageConsole: config.hostingEnvironment.manageConsoleUrl,
      assets: assetsUrl,
      survey: config.hostingEnvironment.surveyUrl,
      serviceNow: config.hostingEnvironment.serviceNowUrl,
    },
    app: {
      environmentBannerMessage:
        config.hostingEnvironment.environmentBannerMessage,
    },
    gaTrackingId: config.hostingEnvironment.gaTrackingId,
    assets: {
      version: config.assets.version,
    },
  });

  const errorPageRenderer = ejsErrorPages.getErrorPageRenderer(
    {
      help: config.hostingEnvironment.helpUrl,
      assets: assetsUrl,
      assetsVersion: config.assets.version,
    },
    config.hostingEnvironment.env === "dev",
  );
  app.use(
    getErrorHandler({
      logger,
      errorPageRenderer,
    }),
  );

  if (config.hostingEnvironment.env === "dev") {
    app.proxy = true;

    const options = {
      key: config.hostingEnvironment.sslKey,
      cert: config.hostingEnvironment.sslCert,
      requestCert: false,
      rejectUnauthorized: false,
    };
    const server = https.createServer(options, app);

    server.listen(config.hostingEnvironment.port, () => {
      logger.info(
        `Dev server listening on https://${config.hostingEnvironment.host}:${config.hostingEnvironment.port} with config:\n${JSON.stringify(config)}`,
      );
    });
  } else if (config.hostingEnvironment.env === "docker") {
    app.listen(config.hostingEnvironment.port, () => {
      logger.info(
        `Server listening on http://${config.hostingEnvironment.host}:${config.hostingEnvironment.port}`,
      );
    });
  } else {
    app.listen(process.env.PORT, () => {
      logger.info(
        `Server listening on http://${config.hostingEnvironment.host}:${config.hostingEnvironment.port}`,
      );
    });
  }

  return app;
};

const app = init().catch((err) => {
  logger.error(err);
});

module.exports = app;
