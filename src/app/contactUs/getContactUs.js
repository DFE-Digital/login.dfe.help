const { getAndMapExternalServices } = require('../shared/utils');

const get = async (req, res) => {
  // cancel button will take back to dashboard by default (if going directly to this page)
  let cancelLink = '/dashboard';
  if (req.get('referrer')) {
    const url = new URL(req.get('referrer'));
    cancelLink = url.pathname;
  }
  // retrieve list of services
  const services = await getAndMapExternalServices(req.id);
  // render the view
  res.render('contactUs/views/contactUs', {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in',
    name: '',
    email: '',
    orgName: '',
    urn: '',
    service: '',
    type: '',
    typeOtherMessage: '',
    message: '',
    validationMessages: {},
    isHidden: true,
    backLink: true,
    referrer: cancelLink,
    isHomeTopHidden: true,
    services,
  });
};

module.exports = {
  get,
};
