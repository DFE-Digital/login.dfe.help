const config = require('./../config');
const jwtStrategy = require('login.dfe.jwt-strategies');
const rp = require('login.dfe.request-promise-retry');
const { organisation } = require('login.dfe.dao');

const callApi = async (method, path, correlationId, body) => {
  const token = await jwtStrategy(config.organisations.service).getBearerToken();

  const hasSeperator =
    (config.organisations.service.url.endsWith('/') && !path.startsWith('/')) ||
    (!config.organisations.service.url.endsWith('/') && path.startsWith('/'));
  const basePathSeperator = hasSeperator ? '' : '/';
  const opts = {
    method,
    uri: `${config.organisations.service.url}${basePathSeperator}${path}`,
    headers: {
      authorization: `bearer ${token}`,
      'x-correlation-id': correlationId,
    },
    json: true,
  };
  if (body && (method === 'POST' || method !== 'PUT' || method !== 'PATCH')) {
    opts.body = body;
  }
  return rp(opts);
};

const getOrganisationAndServiceForUserV2 = async (userId, correlationId) => {
  return await organisation.getOrganisationsForUserIncludingServices(userId);
};

const getAllRequestsForApprover = async (userId, correlationId) => {
  return callApi('GET', `/organisations/requests-for-approval/${userId}`, correlationId);
};

module.exports = {
  getOrganisationAndServiceForUserV2,
  getAllRequestsForApprover,
};
