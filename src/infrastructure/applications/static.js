const applications = [];

const listAllServices = async (correlationId) => {
  return Promise.resolve(null);
};

const getServiceById = async (sid, correlationId) => {
  return applications.find(
    (a) =>
      a.id.toLowerCase() === sid.toLowerCase() ||
      (a.relyingParty &&
        a.relyingParty.clientId.toLowerCase() === sid.toLowerCase()),
  );
};

module.exports = {
  listAllServices,
  getServiceById,
};
