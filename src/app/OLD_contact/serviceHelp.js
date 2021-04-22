const { getServiceById } = require('../../infrastructure/applications');

const get = async (req, res) => {
  const service = await getServiceById(req.params.sid, req.id);

  if (service && service.relyingParty && service.relyingParty.params && service.relyingParty.params.helpDestination) {
    return res.redirect(service.relyingParty.params.helpDestination);
  }

  const model = {
    service,
    selectedServiceHelp: '',
    csrfToken: req.csrfToken(),
    validationMessages: {},
    title: 'DfE Sign-in help',
    backLink: true,
  };
  return res.render('contact/views/serviceHelp', model);
};

const validate = async (req) => {
  const service = await getServiceById(req.params.sid, req.id);
  const model = {
    service,
    selectedServiceHelp: req.body.selectedServiceHelp,
    csrfToken: req.csrfToken(),
    validationMessages: {},
    title: 'DfE Sign-in help',
    backLink: true,
  };

  if (!model.selectedServiceHelp) {
    model.validationMessages.selectedServiceHelp = 'An option must be selected';
  }
  return model;
};

const post = async (req, res) => {
  const model = await validate(req);
  if (Object.keys(model.validationMessages).length > 0) {
    model.csrfToken = req.csrfToken();
    return res.render('contact/views/serviceHelp', model);
  }

  if (model.selectedServiceHelp === 'add-service') {
    return res.redirect(`${req.params.sid}/access-service`);
  }

  if (model.selectedServiceHelp === 'verification-email') {
    return res.redirect(`${req.params.sid}/verification-email`);
  }

  if (model.selectedServiceHelp === 'error') {
    return res.redirect(`/contact/submit?type=service-access&service=${model.service.name}`);
  }
};

module.exports = {
  get,
  post,
};
