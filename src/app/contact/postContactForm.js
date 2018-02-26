const config = require('./../../infrastructure/config');
const NotificationClient = require('login.dfe.notifications.client');

const notificationClient = new NotificationClient({
  connectionString: config.notifications.connectionString,
});

const postContactForm = async (req, res) => {
  // TODO: Validate
  await notificationClient.sendSupportRequest(req.body.name, req.body.email, req.body.phone, req.body.message, 'TODO1234');

  res.redirect('/contact/confirm');
};

module.exports = postContactForm;
