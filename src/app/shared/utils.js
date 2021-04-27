const { listAllServices } = require('../../infrastructure/applications');
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

module.exports = {
  getAndMapExternalServices,
};
