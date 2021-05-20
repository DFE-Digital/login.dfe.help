const config = require('../../infrastructure/config');
const { decode } = require('html-entities');
const NotificationClient = require('login.dfe.notifications.client');
const emailValidator = require('email-validator');

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

const isValidStringValue = (value) => {
  const regex = /\w+/i;
  const match = regex.exec(value);
  if (match) {
    return true;
  }
  return false;
};

const validate = (name, email, orgName, message) => {
  const validationMessages = {};

  if (!name || !isValidStringValue(name)) {
    validationMessages.name = 'Enter your name';
  }

  const invalidEmailMessage = validateEmail(email);
  if (invalidEmailMessage) {
    validationMessages.email = invalidEmailMessage;
  }

  if (!orgName || !isValidStringValue(orgName)) {
    validationMessages.orgName = 'Enter your organisation name';
  }

  if (!message || !isValidStringValue(message)) {
    validationMessages.message = 'Enter information about your issue';
  } else if (message.length > 1000) {
    validationMessages.message = 'Message cannot be longer than 1000 characters';
  }

  return {
    isValid: Object.keys(validationMessages).length === 0,
    validationMessages,
  };
};


const post = async (req, res) => {
  const message = decode(req.body.message);
  const email = decode(req.body.email);
  const orgName = decode(req.body.orgName);
  const name = decode(req.body.name);
  const urn = decode(req.body.urn);

  const validationResult = validate(name, email, orgName, message);
  if (!validationResult.isValid) {
    // cancel button will take back to dashboard by default (if going directly to this page)
    let cancelLink = '/dashboard';
    if (req.body.currentReferrer) {
      cancelLink = req.body.currentReferrer;
    }
    return res.render('contactUs/views/contactUs', {
      csrfToken: req.csrfToken(),
      name,
      email,
      orgName,
      urn,
      message,
      validationMessages: validationResult.validationMessages,
      isHidden: true,
      backLink: true,
      referrer: cancelLink,
    });
  }

  // send details to notificationClient, which is expecting service, phone and type, so we send them as null
  await notificationClient.sendSupportRequest(name, email, null, null, null, message, orgName, urn);

  // render dashboard with success message
  // we should handle errors here but that hasn't been defined yet
  res.flash('notification', 'Success');
  res.flash('heading', 'Contact DfE Sign-in form submitted');
  res.flash('message', 'We will respond as soon as possible (usually within 5 working days).');
  res.redirect('/dashboard');
};

module.exports = {
  post,
};
