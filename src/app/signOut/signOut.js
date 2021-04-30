'use strict';

/* eslint-disable no-underscore-dangle */

const url = require('url');
const passport = require('passport');
const config = require('./../../infrastructure/config');
const logger = require('./../../infrastructure/logger');

const logout = (req, res) => {
  req.logout();
  req.session = null; // Needed to clear session and completely logout
};

const signUserOut = async (req, res) => {
  if (req.user && req.user.id_token) {

    logger.audit({
      type: 'Sign-out',
      userId: req.user.sub,
      application: config.loggerSettings.applicationName,
      env: config.hostingEnvironment.env,
      message: 'User logged out',
      meta: {
        email: req.user.email,
        client: 'services',
      },
    });

    const idToken = req.user.id_token;
    const returnUrl = `${config.hostingEnvironment.profileUrl}/signout`;

    logger.info('service signout :: there is no redirect_uri and redirected');
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
    res.redirect('/');
  }
};

module.exports = signUserOut;
