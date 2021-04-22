const { getAndMapExternalServices } = require('./utils');

const getContactForm = async (req, res) => {
  const services = await getAndMapExternalServices(req.id);
  req.session = null;

  res.render('contact/views/contactForm', {
    csrfToken: req.csrfToken(),
    name: '',
    email: '',
    orgName: '',
    urn: '',
    phone: '',
    service: req.query.service ? req.query.service : '',
    type: req.query.type ? req.query.type : '',
    message: '',
    validationMessages: {},
    isHidden: true,
    backLink: true,
    services,
  });
};

module.exports = getContactForm;
