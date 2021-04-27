const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    selectedHelp: '',
    validationMessages: {},
    title: 'DfE Sign-in help',
    backLink: true,
  };
  return res.render('contact/views/help', model);
};

const validate = (req) => {
  const model = {
    csrfToken: req.csrfToken(),
    selectedHelp: req.body.selectedHelp,
    validationMessages: {},
    title: 'DfE Sign-in help',
    backLink: true,
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

  if (model.selectedHelp === 'create-account') {
    return res.redirect('contact/create-account')
  }
  if (model.selectedHelp === 'access-service') {
    return res.redirect('contact/service')
  }
  if (model.selectedHelp === 'email-password') {
    return res.redirect('contact/email-password')
  }
  if (model.selectedHelp === 'approver') {
    return res.redirect('contact/approver')
  }
  if (model.selectedHelp === 'add-org') {
    return res.redirect('contact/add-org')
  }

};
module.exports = {
  get,
  post,
};
