const get = async (req, res) => {
  res.render('contactUs/views/contactUs', {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
    name: '',
    email: '',
    orgName: '',
    urn: '',
    message: '',
    validationMessages: {},
    isHidden: true,
    backLink: true,
    referrer: req.get('referrer'),
  });
};

module.exports = {
  get,
};
