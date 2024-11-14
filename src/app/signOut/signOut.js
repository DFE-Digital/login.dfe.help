const url = require("url");
const passport = require("passport");
const config = require("../../infrastructure/config");
const logger = require("../../infrastructure/logger");

const logout = (req) => {
  req.logout(() => {
    logger.info("user logged out.");
  });
  req.session = null; // Needed to clear session and completely logout
};

const signUserOut = async (req, res) => {
  if (req.user && req.user.id_token) {
    logger.audit({
      type: "Sign-out",
      userId: req.user.sub,
      application: config.loggerSettings.applicationName,
      env: config.hostingEnvironment.env,
      message: "User logged out",
      meta: {
        email: req.user.email,
        client: "help",
      },
    });

    const idToken = req.user.id_token;
    let returnUrl = `${config.hostingEnvironment.profileUrl}/signout`;

    if (req.query.timeout === "1") {
      logger.info("session timeout signout");
      returnUrl = `${config.hostingEnvironment.protocol}://${config.hostingEnvironment.host}:${config.hostingEnvironment.port}/signout/session-timeout`;
    }
    logger.info("service signout :: there is no redirect_uri and redirected");
    logout(req, res);
    const issuer = passport._strategies.oidc._issuer;
    res.redirect(
      url.format(
        Object.assign(url.parse(issuer.end_session_endpoint), {
          search: null,
          query: {
            id_token_hint: idToken,
            post_logout_redirect_uri: returnUrl,
          },
        }),
      ),
    );
  } else {
    logout(req, res);
    res.redirect("/");
  }
};

module.exports = signUserOut;
