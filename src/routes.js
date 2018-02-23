const contact = require('./app/contact');

const mountRoutes = (app, csrf) => {
  app.use('/contact', contact(csrf));
};

module.exports = mountRoutes;