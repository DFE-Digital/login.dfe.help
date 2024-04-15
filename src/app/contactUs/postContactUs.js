const { decode } = require('html-entities');
const NotificationClient = require('login.dfe.notifications.client');
const emailValidator = require('email-validator');
const config = require('../../infrastructure/config');
const { getAndMapExternalServices } = require('../shared/utils');

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
  const regex = /[a-zA-Z0-9]/i;
  const match = regex.exec(value);
  if (match) {
    return true;
  }
  return false;
};

const validate = (fieldsObj, services) => {
  const validationMessages = {};

  const {
    name, email, orgName, urn, message, service, type, typeOtherMessage,
  } = fieldsObj;

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

  if (urn && (typeof urn !== 'string' || !/^[0-9]{6,8}$/.test(urn))) {
    validationMessages.urn = 'Enter a valid URN or UKPRN, if known';
  }

  if (!type) {
    validationMessages.type = 'Enter information about what you need help with';
  }

  if (type === 'other' && (!typeOtherMessage || !isValidStringValue(typeOtherMessage))) {
    validationMessages.typeOtherMessage = 'Enter information about your issue';
  }

  if (!service || (service && ![...services.map((x) => x.name), 'Other', 'None'].includes(service))) {
    validationMessages.service = 'Select the service you are trying to use';
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
  const notificationClient = new NotificationClient({
    connectionString: config.notifications.connectionString,
  });

  const message = decode(req.body.message);
  const email = decode(req.body.email);
  const orgName = decode(req.body.orgName);
  const name = decode(req.body.name);
  const urn = decode(req.body.urn);
  const service = decode(req.body.service);
  const type = decode(req.body.type);
  const typeOtherMessage = decode(req.body.typeOtherMessage);

  // Retrieve list of services for validation and rendering contact form.
  const services = await getAndMapExternalServices(req.id);

  const validationResult = validate({
    name, email, orgName, urn, message, service, type, typeOtherMessage,
  }, services);

  if (!validationResult.isValid) {
    // cancel button will take back to dashboard by default (if going directly to this page)
    let cancelLink = '/dashboard';
    if (req.body.currentReferrer) {
      cancelLink = req.body.currentReferrer;
    }
    return res.render('contactUs/views/contactUs', {
      csrfToken: req.csrfToken(),
      title: 'DfE Sign-in',
      name,
      email,
      orgName,
      urn,
      service,
      type,
      typeOtherMessage,
      message,
      validationMessages: validationResult.validationMessages,
      isHidden: true,
      backLink: true,
      referrer: cancelLink,
      isHomeTopHidden: true,
      services,
    });
  }

  // send details to notificationClient, which is expecting service, phone and type, so we send them as null
  await notificationClient.sendSupportRequest(name, email, service, type, typeOtherMessage, orgName, urn, message);

  if (req.query.redirect_uri) {
    return res.redirect(`/contact-us/completed?redirect_uri=${req.query.redirect_uri}`);
  }
  return res.redirect('/contact-us/completed');
};

module.exports = {
  post,
};
