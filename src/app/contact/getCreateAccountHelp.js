const { getServiceById } = require('./../../infrastructure/applications');

const getCreateAccountHelp = async (req, res) => {
  const service = await getServiceById(req.params.sid, req.id);

  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
    backLink: true,
    service,
  };
  return res.render('contact/views/createAccountHelp', model);
};

module.exports = getCreateAccountHelp;

