const { getAndMapExternalServices } = require('./utils');

const getContactForm = async (req, res) => {
  const services = await getAndMapExternalServices(req.id);
  req.session = null;

  res.render('contact/views/contactForm', {
    csrfToken: req.csrfToken(),
    name: '',
    email: '',
    saUsername: '',
    orgName: '',
    urn: '',
    phone: '',
    service: '',
    type: '',
    message: '',
    validationMessages: {},
    isHidden: true,
    backLink: true,
    services,
  });
};

module.exports = getContactForm;
