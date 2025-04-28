const config = require("../../infrastructure/config");
const { getUserService } = require("login.dfe.api-client/users");

const getUserServiceRoles = async (req) => {
  const allUserRoles = req.userServices.roles.map((role) => ({
    serviceId: role.code.substr(0, role.code.indexOf("_")),
    role: role.code.substr(role.code.lastIndexOf("_") + 1),
  }));
  const userRolesForService = allUserRoles.filter(
    (x) => x.serviceId === req.params.sid,
  );
  return userRolesForService.map((x) => x.role);
};

const getSingleUserServiceAndRoles = async (req) => {
  req.userServices = await getUserService({
    userId: req.user.sub,
    serviceId: config.access.identifiers.service,
    organisationId: config.access.identifiers.organisation,
  });
  const manageRolesForService = await getUserServiceRoles(req);
  return manageRolesForService;
};

module.exports = {
  getSingleUserServiceAndRoles,
};
