const { listAllServices } = require('./../../infrastructure/applications');
const sortBy = require('lodash/sortBy');
const uniqBy = require('lodash/uniqBy');

const getAndMapExternalServices = async (correlationId) => {
  const allServices = await listAllServices(correlationId) || [];
  const externalServices = allServices.services.filter(x => x.isExternalService === true && !(x.relyingParty && x.relyingParty.params && x.relyingParty.params.helpHidden === 'true'));
  const services = uniqBy(externalServices.map((service) => ({
    id: service.id,
    name: service.name,
  })), 'id');
  return sortBy(services, 'name');
};

const get = async (req, res) => {

  const services = await getAndMapExternalServices(req.id);

  const model = {
    csrfToken: req.csrfToken(),
    selectedService: '',
    validationMessages: {},
    services,
    title: 'DfE Sign-in help',
    backLink: true,
  };
  return res.render('contact/views/selectService', model);
};

const validate = async (req) => {
  const services = await getAndMapExternalServices(req.id);
  const model = {
    selectedService: req.body.selectedService,
    validationMessages: {},
    services,
    title: 'DfE Sign-in help',
    backLink: true,
  };
  if (!model.selectedService) {
    model.validationMessages.service = 'Please select a service'
  }
  return model;
};

const post = async (req, res) => {
  const model = await validate(req);
  if (Object.keys(model.validationMessages).length > 0) {
    model.csrfToken = req.csrfToken();
    return res.render('contact/views/selectService', model);
  }
const serviceIdentity = model.selectedService.split(',');
  if (model.selectedService === 'other') {
    return res.redirect('/contact/submit?type=service-access&service=Other');
  }else if ((serviceIdentity && serviceIdentity[1]) && serviceIdentity[1] === 'Publish to the course directory') {
    return res.redirect('/contact/course-directory')
  }
  else {
    return res.redirect(`service/${serviceIdentity[0]}`);
  }
};

module.exports = {
  get,
  post,
};
