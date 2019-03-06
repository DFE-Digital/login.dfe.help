const { getServiceById } = require('./../../infrastructure/applications');

const get = async (req, res) => {
  const service = await getServiceById(req.params.sid, req.id);
  if (service && service.relyingParty && service.relyingParty.params && service.relyingParty.params.helpDestination) {
    return res.redirect(service.relyingParty.params.helpDestination);
  }
  const model = {
    service,
    csrfToken: req.csrfToken(),
    validationMessages: {},
  };
  return res.render('contact/views/serviceHelp', model);
};


const post = async (req, res) => {

};

module.exports = {
  get,
  post,
};
