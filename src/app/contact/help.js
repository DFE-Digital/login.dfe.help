const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    selectedHelp: '',
    validationMessages: {},
    title: 'Contact DfE Sign-in',
  };
  return res.render('contact/views/help', model);
};

const validate = (req) => {
  const model = {
    csrfToken: req.csrfToken(),
    selectedHelp: req.body.selectedHelp,
    validationMessages: {},
    title: 'Contact DfE Sign-in',
  };

  if (!model.selectedHelp) {
    model.validationMessages.selectedHelp = 'Please answer this question'
  }
  return model;
};
const post = async (req, res) => {
  const model = validate(req);
  if (Object.keys(model.validationMessages).length > 0) {
    model.csrfToken = req.csrfToken();
    return res.render('contact/views/help', model);
  }

  if (model.selectedHelp === 'access-service') {
    return res.redirect('contact/service')
  }
  if (model.selectedHelp === 'access-org') {
    return res.redirect('contact/organisation')
  }
  if (model.selectedHelp === 'email-password') {
    return res.redirect('contact/email-password')
  }
  if (model.selectedHelp === 'approver') {
    return res.redirect('contact/approver')
  }
};
module.exports = {
  get,
  post,
};
