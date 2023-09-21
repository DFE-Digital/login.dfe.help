const { getSingleUserServiceAndRoles } = require('./utils');
const get = async (req, res) => {
  if (req.params.sid !== undefined && req.isAuthenticated()) {
    const manageRolesForService = await getSingleUserServiceAndRoles(req);
    const model = {
      csrfToken: req.csrfToken(),
      title: 'DfE Manage',
      subTitle: 'DfE Manage console',
      serviceId: req.params.sid,
      userRoles: manageRolesForService,
      backLink: true,
    };
    return res.render('manageConsole/views/howtoEditServiceConfig', model);
  }
};

module.exports = {
  get,
};
