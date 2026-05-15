const { listAllServices } = require("../../infrastructure/applications");
const sortBy = require("lodash/sortBy");
const uniqBy = require("lodash/uniqBy");

const isTruthy = (v) => v === true || v === 1 || v === "true" || v === "1";

const getAndMapExternalServices = async (correlationId) => {
  const allServices = (await listAllServices(correlationId)) || [];
  const externalServices = allServices.services.filter((x) => {
    if (x.isExternalService !== true) return false;
    const p = x.relyingParty?.params;
    const isFullyHidden =
      isTruthy(p?.hideApprover) &&
      isTruthy(p?.hideSupport) &&
      isTruthy(p?.helpHidden);
    return !isFullyHidden;
  });
  const services = uniqBy(
    externalServices.map((service) => ({
      id: service.id,
      name: service.name,
    })),
    "id",
  );
  return sortBy(services, "name");
};

module.exports = {
  getAndMapExternalServices,
};
