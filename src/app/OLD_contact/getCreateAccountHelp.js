const { getServiceById } = require('./../../infrastructure/applications');

const getCreateAccountHelp = async (req, res) => {
  const service = req.params.sid ? await getServiceById(req.params.sid, req.id) : undefined;

  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
    backLink: true,
    service,
    profileUrl: req.app.locals.urls.profile
  };
  return res.render('contact/views/createAccountHelp', model);
};

module.exports = getCreateAccountHelp;

