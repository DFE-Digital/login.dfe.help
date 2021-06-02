const get = async (req, res) => {
  // cancel button will take back to dashboard by default (if going directly to this page)
  let cancelLink = '/dashboard';
  if (req.get('referrer')) {
    const url = new URL(req.get('referrer'));
    cancelLink = url.pathname;
  }
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
    referrer: cancelLink,
  });
};

module.exports = {
  get,
};
