const getContactForm = async (req, res) => {
  req.session = null;

  res.render('contact/views/contactForm', {
    csrfToken: req.csrfToken(),
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    validationMessages: {},
  });
};

module.exports = getContactForm;
