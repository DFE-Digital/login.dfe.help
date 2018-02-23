const postContactForm = async (req, res) => {
  res.render('contact/views/contactForm', {
    csrfToken: req.csrfToken(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
    validationMessages: {
      name: 'name error',
      email: 'email error',
      phone: 'phone error',
      message: 'message error',
    },
  });
};

module.exports = postContactForm;
