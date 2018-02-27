const getContactForm = async (req, res) => {
  req.session = null;

  res.render('contact/views/contactForm', {
    csrfToken: req.csrfToken(),
    name: '',
    email: '',
    phone: '',
    message: '',
    validationMessages: {},
  });
};

module.exports = getContactForm;
