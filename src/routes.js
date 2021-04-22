const config = require('./infrastructure/config');
const healthCheck = require('login.dfe.healthcheck');
const dashboard = require('./app/dashboard');
const services = require('./app/services')

const mountRoutes = (app, csrf) => {
  app.use('/healthcheck', healthCheck({ config }));

  // route for the dashboard
  // keeping original route to help page to avoid having to update all links in footers
  app.use('/content', dashboard(csrf));
  app.use('/dashboard', dashboard(csrf));

  // mount additional routes for services, approvers, etc
  app.use('/services', services(csrf));

  app.get('*', (req, res) => {
    res.redirect('/dashboard');
  });

};

module.exports = mountRoutes;
