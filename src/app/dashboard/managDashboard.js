const { getSingleUserServiceAndRoles } = require('../manageConsole/utils');

const get = async (req, res) => {
  if (req.params.sid !== undefined && req.isAuthenticated()) {
    const manageRolesForService = await getSingleUserServiceAndRoles(req);
    const model = {
      csrfToken: req.csrfToken(),
      title: 'DfE Manage',
      app: { title: 'DfE Sign-in manage console' },
      subTitle: 'DfE Sign-in manage console',
      serviceId: req.params.sid,
      userRoles: manageRolesForService,
      backLink: false,
    };
    return res.render('dashboard/views/manageDashboard', model);
  }
};

module.exports = {
  get,
};
