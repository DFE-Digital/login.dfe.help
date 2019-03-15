const config = require('./infrastructure/config');
const contact = require('./app/contact');
const healthCheck = require('login.dfe.healthcheck');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const mountRoutes = (app, csrf) => {
  app.use('/healthcheck', healthCheck({ config }));

  app.get('/', asyncWrapper((req,res) => {
    res.redirect('/contact')
  }));

  app.use('/contact', contact(csrf));

  app.get('*', (req, res) => {
    res.status(404).render('errors/views/notFound');
  });
};

module.exports = mountRoutes;
