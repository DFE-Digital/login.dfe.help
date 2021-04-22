const { getServiceById } = require('./../../infrastructure/applications');

const getAccessService = async (req, res) => {
  const service = await getServiceById(req.params.sid, req.id);
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
    service,
    backLink: true,
  };
  return res.render('contact/views/accessService', model);
};

module.exports = getAccessService;

