const getContactForm = async (req, res) => {
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
