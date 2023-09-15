const { getOrganisationAndServiceForUserV2 } = require('../../infrastructure/organisations');
const { getServiceById } = require('../../infrastructure/applications');
const config = require('../../infrastructure/config');

const getUserServiceRoles = async (req) => {
  const allUserRoles = req.userServices.roles.map((role) => ({
    serviceId: role.code.substr(0, role.code.indexOf('_')),
    role: role.code.substr(role.code.lastIndexOf('_') + 1),
  }));
  const userRolesForService = allUserRoles.filter((x) => x.serviceId === req.params.sid);
  return userRolesForService.map((x) => x.role);
};

const getSingleUserServiceAndRoles = async (req) => {
  req.userServices = await getOrganisationAndServiceForUserV2(req.user.sub, req.id);
  const manageRolesForService = await getUserServiceRoles(req);
  return manageRolesForService;
};

module.exports = {
  getSingleUserServiceAndRoles,
};
