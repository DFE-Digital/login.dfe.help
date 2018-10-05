const getContactForm = async (req, res) => {
  req.session = null;

  res.render('contact/views/contactForm', {
    csrfToken: req.csrfToken(),
    name: '',
    email: '',
    saUsername: '',
    phone: '',
    service: '',
    type: '',
    message: '',
    validationMessages: {},
    isHidden: true,
  });
};

module.exports = getContactForm;
