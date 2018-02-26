const config = require('./../../infrastructure/config');
const NotificationClient = require('login.dfe.notifications.client');

const notificationClient = new NotificationClient({
  connectionString: config.notifications.connectionString,
});

const validate = (req) => {
  const validationMessages = {};

  if (!req.body.name) {
    validationMessages.name = 'Please enter your full name';
  }

  if (!req.body.email) {
    validationMessages.email = 'Please enter your email address';
  }

  if (!req.body.message) {
    validationMessages.message = 'Please enter a details of the support your require';
  } else if (req.body.message.length > 1000) {
    validationMessages.message = 'Message cannot be longer than 1000 characters';
  }

  return {
    isValid: Object.keys(validationMessages).length === 0,
    validationMessages,
  };
};

const postContactForm = async (req, res) => {
  const validationResult = validate(req);
  if (!validationResult.isValid) {
    return res.render('contact/views/contactForm', {
      csrfToken: req.csrfToken(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
      validationMessages: validationResult.validationMessages,
    });
  }

  await notificationClient.sendSupportRequest(req.body.name, req.body.email, req.body.phone, req.body.message, 'TODO1234');

  return res.redirect('/contact/confirm');
};

module.exports = postContactForm;
