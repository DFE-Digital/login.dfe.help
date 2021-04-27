const config = require('../../infrastructure/config');
const NotificationClient = require('login.dfe.notifications.client');
const emailValidator = require('email-validator');
const { get: getDashboard } = require('../dashboard/dashboard');

const notificationClient = new NotificationClient({
  connectionString: config.notifications.connectionString,
});

const validateEmail = (email) => {
  const emailValidationMessage = 'Enter your email address';
  let invalidEmailMessage;

  if (email.length === 0) {
    invalidEmailMessage = emailValidationMessage;
  } else if (!emailValidator.validate(email)) {
    invalidEmailMessage = 'Enter a valid email address';
  }

  return invalidEmailMessage;
};

const validate = (req) => {
  const validationMessages = {};

  if (!req.body.name) {
    validationMessages.name = 'Enter your name';
  }

  const invalidEmailMessage = validateEmail(req.body.email);
  if (invalidEmailMessage) {
    validationMessages.email = invalidEmailMessage;
  }

  if (!req.body.orgName) {
    validationMessages.orgName = 'Enter your organisation name';
  }

  if (!req.body.message) {
    validationMessages.message = 'Enter information about your issue';
  } else if (req.body.message.length > 1000) {
    validationMessages.message = 'Message cannot be longer than 1000 characters';
  }

  return {
    isValid: Object.keys(validationMessages).length === 0,
    validationMessages,
  };
};


const post = async (req, res) => {
  let message = req.body.message;
  let email = req.body.email;
  let org = req.body.orgName;
  let name = req.body.name;
  const excludeSanitization = {
    '&#13;': '  ',
    '&#10;': '  ',
    '&#39;': "'",
    '&#33;': '!',
    '&#63;': '?',
    '&#58;': ':',
    '&quot;': '"',
    '&amp;': '&',
  };
  Object.keys(excludeSanitization).forEach((e) => {
    const regex = new RegExp(e, 'g');

    message = message.replace(regex, excludeSanitization[e]);
    email = email.replace(regex, excludeSanitization[e]);
    org = org.replace(regex, excludeSanitization[e]);
    name = name.replace(regex, excludeSanitization[e]);
  });

  const validationResult = validate(req);
  if (!validationResult.isValid) {
    return res.render('contactUs/views/contactUs', {
      csrfToken: req.csrfToken(),
      name,
      email,
      orgName: org,
      urn: req.body.urn,
      message,
      validationMessages: validationResult.validationMessages,
      isHidden: true,
      backLink: true,
    });
  }

  await notificationClient.sendSupportRequest(name, email, message, org, req.body.urn);

  // render dashboard with success message
  // we should handle errors here but that hasn't been defined yet
  return getDashboard(req, res, true);
};

module.exports = {
  post,
};
