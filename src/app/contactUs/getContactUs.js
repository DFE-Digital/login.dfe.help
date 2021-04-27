const get = async (req, res) => {
  req.session = null;

  res.render('contactUs/views/contactUs', {
    csrfToken: req.csrfToken(),
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
