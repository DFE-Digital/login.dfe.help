const { decode } = require('html-entities');
const NotificationClient = require('login.dfe.notifications.client');
const emailValidator = require('email-validator');
const config = require('../../infrastructure/config');
const logger = require('../../infrastructure/logger');
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
    validationMessages.type = 'Select the type of issue you need help with';
  }

  if (type === 'other' && (!typeOtherMessage || !isValidStringValue(typeOtherMessage))) {
    validationMessages.typeOtherMessage = 'Enter a summary of your issue';
  }

  if (typeof typeOtherMessage === 'string' && typeOtherMessage.length > 200) {
    validationMessages.typeOtherMessage = 'Issue summary must be 200 characters or less';
  }

  if (!service || (service && ![...services.map((x) => x.name), 'Other', 'None'].includes(service))) {
    validationMessages.service = 'Select the service you are trying to use';
  }

  if (!message || !isValidStringValue(message)) {
    validationMessages.message = 'Enter information about your issue';
  } else if (message.length > 1000) {
    validationMessages.message = 'Issue details cannot be longer than 1000 characters';
  }

  if (
    (!validationMessages.name && !validationMessages.orgName)
    && (name.toUpperCase() === orgName.toUpperCase())
  ) {
    validationMessages.name = 'Full name and organisation name must not match';
    validationMessages.orgName = 'Full name and organisation name must not match';
  }

  if (
    (!validationMessages.typeOtherMessage && !validationMessages.message)
    && (typeOtherMessage.toUpperCase() === message.toUpperCase().substring(0, 200))
  ) {
    validationMessages.typeOtherMessage = 'Issue summary and further details must not match';
    validationMessages.message = 'Issue summary and further details must not match';
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

  // If either or both the honeypot fields are not blank, log the request, otherwise send it to the service desk.
  if ([req.body.phoneNumber, req.body.password].some((x) => typeof x !== 'string' || x !== '')) {
    logger.audit({
      type: 'contact-form',
      subType: 'spam-detection',
      application: config.loggerSettings.applicationName,
      env: config.hostingEnvironment.env,
      message: 'Spam detected in contact form (honeypot field(s) filled)',
      requestIp: req.headers?.['x-forwarded-for'] || req.socket?.remoteAddress,
      meta: {
        body: {
          name, email, orgName, urn, type, typeOtherMessage, service, message,
        },
      },
    });
  } else {
    await notificationClient.sendSupportRequest(name, email, service, type, typeOtherMessage, orgName, urn, message);
  }

  if (req.query.redirect_uri) {
    return res.redirect(`/contact-us/completed?redirect_uri=${req.query.redirect_uri}`);
  }
  return res.redirect('/contact-us/completed');
};

module.exports = {
  post,
};
