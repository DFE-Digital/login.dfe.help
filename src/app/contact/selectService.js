const { listAllServices } = require('./../../infrastructure/applications');
const sortBy = require('lodash/sortBy');
const uniqBy = require('lodash/uniqBy');

const getAndMapExternalServices = async (correlationId) => {
  const allServices = await listAllServices(correlationId) || [];
  const externalServices = allServices.services.filter(x => x.isExternalService === true);
  const services = uniqBy(externalServices.map((service) => ({
    id: service.id,
    name: service.name,
  })), 'id');
  return sortBy(services, 'name');
};

const get = async (req, res) => {

  const services = await getAndMapExternalServices(req.id);
  return res.render('contact/views/selectService', {
    csrfToken: req.csrfToken(),
    selectedService: '',
    validationMessages: {},
    services,
  });
};

module.exports = {
  get,
};
