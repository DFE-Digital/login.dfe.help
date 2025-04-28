const { getPaginatedServicesRaw } = require("login.dfe.api-client/services");

const listAllServices = async () => {
  const services = [];

  let pageNumber = 1;
  let numberOfPages = undefined;
  while (numberOfPages === undefined || pageNumber <= numberOfPages) {
    const page = await getPaginatedServicesRaw({ pageNumber, pageSize: 50 });

    services.push(...page.services);

    numberOfPages = page.numberOfPages;
    pageNumber += 1;
  }

  return { services };
};

module.exports = {
  listAllServices,
};
