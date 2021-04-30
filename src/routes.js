const config = require('./infrastructure/config');
const healthCheck = require('login.dfe.healthcheck');
const dashboard = require('./app/dashboard');
const services = require('./app/services');
const organisations = require('./app/organisations');
const manageUsers = require('./app/manageUsers');
const requests = require('./app/requests');
const profile = require('./app/profile');
const approvers = require('./app/approvers');
const endUsers = require('./app/endUsers');
const contactUs = require('./app/contactUs');

const passport = require('passport');
const signOut = require('./app/signOut');
const logger = require('./infrastructure/logger');
const { isLoggedIn } = require('./infrastructure/utils');

const mountRoutes = (app, csrf) => {

  // authentication routes
  app.get('/auth', passport.authenticate('oidc'));
  app.get('/auth/cb', (req, res, next) => {
    const defaultLoggedInPath = '/dashboard';

    if (req.query.error === 'sessionexpired') {
      return res.redirect(defaultLoggedInPath);
    }
    passport.authenticate('oidc', (err, user) => {
      let redirectUrl = defaultLoggedInPath;

      if (err) {
        if (err.message.match(/state\smismatch/)) {
          req.session = null;
          return res.redirect(defaultLoggedInPath);
        }
        logger.error(`Error in auth callback - ${err}`);
        return next(err);
      }
      if (!user) {
        return res.redirect('/');
      }

      if (req.session.redirectUrl) {
        redirectUrl = req.session.redirectUrl;
        req.session.redirectUrl = null;
      }

      return req.logIn(user, (loginErr) => {
        if (loginErr) {
          logger.error(`Login error in auth callback - ${loginErr}`);
          return next(loginErr);
        }
        if (redirectUrl.endsWith('signout/complete')) redirectUrl = '/';
        return res.redirect(redirectUrl);
      });
    })(req, res, next);
  });

  app.use('/signout', signOut(csrf));

  // app routes
  app.use('/healthcheck', healthCheck({ config }));

  // route for the dashboard
  // keeping original route to help page to avoid having to update all links in footers
  app.use('/contact', isLoggedIn, dashboard(csrf));
  app.use('/dashboard', isLoggedIn, dashboard(csrf));

  // additional routes for services, approvers, etc
  app.use('/services', isLoggedIn, services(csrf));
  app.use('/organisations', isLoggedIn, organisations(csrf));
  app.use('/manage-users', isLoggedIn, manageUsers(csrf));
  app.use('/requests', isLoggedIn, requests(csrf));
  app.use('/profile', isLoggedIn, profile(csrf));
  app.use('/approvers', isLoggedIn, approvers(csrf));
  app.use('/end-users', isLoggedIn, endUsers(csrf));
  app.use('/contact-us', isLoggedIn, contactUs(csrf));

  app.get('*', (req, res) => {
    res.redirect('/dashboard');
  });
};

module.exports = mountRoutes;
