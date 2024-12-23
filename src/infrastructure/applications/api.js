const config = require("./../config");
const { fetchApi } = require("login.dfe.async-retry");
const jwtStrategy = require("login.dfe.jwt-strategies");

const callApi = async (endpoint, method, body, correlationId) => {
  const token = await jwtStrategy(config.applications.service).getBearerToken();

  try {
    return await fetchApi(`${config.applications.service.url}/${endpoint}`, {
      method: method,
      headers: {
        authorization: `bearer ${token}`,
        "x-correlation-id": correlationId,
      },
      body: body,
    });
  } catch (e) {
    const status = e.statusCode ? e.statusCode : 500;
    if (status === 401 || status === 404) {
      return null;
    }
    if (status === 409) {
      return false;
    }
    throw e;
  }
};

const getPageOfService = async (pageNumber, pageSize) => {
  const token = await jwtStrategy(config.applications.service).getBearerToken();
  try {
    const client = await fetchApi(
      `${config.applications.service.url}/services?page=${pageNumber}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          authorization: `bearer ${token}`,
        },
      },
    );
    return client;
  } catch (e) {
    if (e.statusCode === 404) {
      return undefined;
    }
    throw e;
  }
};

const listAllServices = async () => {
  const services = [];

  let pageNumber = 1;
  let numberOfPages = undefined;
  while (numberOfPages === undefined || pageNumber <= numberOfPages) {
    const page = await getPageOfService(pageNumber, 50);

    services.push(...page.services);

    numberOfPages = page.numberOfPages;
    pageNumber += 1;
  }

  return { services };
};
const getSingleUserService = async (id, sid, oid, correlationId) =>
  callApi(
    "GET",
    `/users/${id}/services/${sid}/organisations/${oid}`,
    correlationId,
    undefined,
  );

const getServiceById = async (sid, correlationId) => {
  return await callApi(`services/${sid}`, "GET", undefined, correlationId);
};

module.exports = {
  listAllServices,
  getServiceById,
  getSingleUserService,
};
