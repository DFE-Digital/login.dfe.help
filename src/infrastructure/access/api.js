const config = require("./../config");

const { fetchApi } = require("login.dfe.async-retry");
const jwtStrategy = require("login.dfe.jwt-strategies");

const callApi = async (method, endpoint, correlationId, body) => {
  const token = await jwtStrategy(config.access.service).getBearerToken();

  try {
    return await fetchApi(`${config.access.service.url}/${endpoint}`, {
      method,
      headers: {
        authorization: `bearer ${token}`,
        "x-correlation-id": correlationId,
      },
      body: body,
    });
  } catch (e) {
    const status = e.statusCode ? e.statusCode : 500;
    if (status === 404) {
      return undefined;
    }
    throw e;
  }
};

const getSingleUserService = async (id, sid, oid, correlationId) => {
  return callApi(
    "GET",
    `/users/${id}/services/${sid}/organisations/${oid}`,
    correlationId,
    undefined,
  );
};

module.exports = {
  getSingleUserService,
};
