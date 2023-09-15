const { getSingleUserService } = require('../../infrastructure/applications');
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
  req.userServices = await getSingleUserService(req.user.sub, 'b1f190aa-729a-45fc-a695-4ea209dc79d4','3de9d503-6609-4239-ba55-14f8ebd69f56', req.id);
  const manageRolesForService = await getUserServiceRoles(req);
  return manageRolesForService;
};

module.exports = {
  getSingleUserServiceAndRoles,
};
