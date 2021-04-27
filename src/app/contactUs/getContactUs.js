const { getAndMapExternalServices } = require('../shared/utils');

const get = async (req, res) => {
  const services = await getAndMapExternalServices(req.id);
  req.session = null;

  res.render('contactUs/views/contactUs', {
    csrfToken: req.csrfToken(),
    name: '',
    email: '',
    orgName: '',
    urn: '',
    phone: '',
    service: req.query.service ? req.query.service : '',
    type: req.query.type ? req.query.type : '',
    message: '',
    validationMessages: {},
    isHidden: true,
    backLink: true,
    services,
    referrer: req.get('referrer'),
  });
};

module.exports = {
  get,
};
