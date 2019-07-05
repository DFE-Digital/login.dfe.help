const config = require('./../../infrastructure/config');
const NotificationClient = require('login.dfe.notifications.client');
const { getAndMapExternalServices } = require('./utils');

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
    validationMessages.message = 'Please enter the details of the support you require';
  } else if (req.body.message.length > 1000) {
    validationMessages.message = 'Message cannot be longer than 1000 characters';
  }
  if (!req.body.service) {
    validationMessages.service = 'Please select the service you are using';
  }
  if(!req.body.type) {
    validationMessages.type = 'Please select a type of issue'
  }

  return {
    isValid: Object.keys(validationMessages).length === 0,
    validationMessages,
  };
};


const postContactForm = async (req, res) => {
  let message = req.body.message;
  let email = req.body.email;
  let org = req.body.orgName;
  let name = req.body.name;
  const excludeSanitization = {
    '&#13;': '  ',
    '&#10;': '  ',
    '&#39;': "'",
    '&#33;': "!",
    '&#63;': '?',
    '&#58;': ':'
  };
  Object.keys(excludeSanitization).forEach((e) => {
    const regex = new RegExp(e, 'g');

    message = message.replace(regex, excludeSanitization[e]);
    email = email.replace(regex, excludeSanitization[e]);
    org = org.replace(regex, excludeSanitization[e]);
    name = name.replace(regex, excludeSanitization[e]);
  });

  const services = await getAndMapExternalServices(req.id);
  const validationResult = validate(req);
  if (!validationResult.isValid) {
    return res.render('contact/views/contactForm', {
      csrfToken: req.csrfToken(),
      name: name,
      email: email,
      phone: req.body.phone,
      orgName: org,
      urn: req.body.urn,
      service: req.body.service,
      type: req.body.type,
      message: message,
      validationMessages: validationResult.validationMessages,
      isHidden: true,
      backLink: true,
      services,
    });
  }


  await notificationClient.sendSupportRequest(name, email, req.body.phone, req.body.service, req.body.type, message, org, req.body.urn);

  return res.redirect('/contact/confirm');
};

module.exports = postContactForm;
