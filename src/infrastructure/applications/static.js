const applications = [];

const listAllServices = async () => {
  return Promise.resolve(null);
};

const getServiceById = async (sid) => {
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
