const config = require('./infrastructure/config');
const dashboard = require('./app');
const healthCheck = require('login.dfe.healthcheck');

const mountRoutes = (app, csrf) => {
  app.use('/healthcheck', healthCheck({ config }));

  app.use('/dashboard', dashboard(csrf));

  app.get('*', (req, res) => {
    res.redirect('/dashboard');
  });
};

module.exports = mountRoutes;
