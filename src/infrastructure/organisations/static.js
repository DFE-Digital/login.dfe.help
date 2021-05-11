const getOrganisationAndServiceForUserV2 = async (userId, correlationId) => {
  return Promise.resolve([]);
};

const getApproversForOrganisation = async (organisationId, correlationId) => {
  return Promise.resolve();
};

module.exports = {
  getOrganisationAndServiceForUserV2,
  getApproversForOrganisation,
};
