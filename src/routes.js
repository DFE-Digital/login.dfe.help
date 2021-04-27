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

const mountRoutes = (app, csrf) => {
  app.use('/healthcheck', healthCheck({ config }));

  // route for the dashboard
  // keeping original route to help page to avoid having to update all links in footers
  app.use('/contact', dashboard(csrf));
  app.use('/dashboard', dashboard(csrf));

  // mount additional routes for services, approvers, etc
  app.use('/services', services(csrf));
  app.use('/organisations', organisations(csrf));
  app.use('/manage-users', manageUsers(csrf));
  app.use('/requests', requests(csrf));
  app.use('/profile', profile(csrf));
  app.use('/approvers', approvers(csrf));
  app.use('/end-users', endUsers(csrf));
  app.use('/contact-us', contactUs(csrf));

  app.get('*', (req, res) => {
    res.redirect('/dashboard');
  });

};

module.exports = mountRoutes;
