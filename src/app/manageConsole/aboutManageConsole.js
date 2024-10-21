const { getSingleUserServiceAndRoles } = require('./utils');
const config = require('../../infrastructure/config');

const get = async (req, res) => {
  if (req.params.sid !== undefined && req.isAuthenticated()) {
    let bkLink = true;
    let tbLink = '';
    if (req.headers.referer === undefined) {
      tbLink = `https://${config.hostingEnvironment.host}:${config.hostingEnvironment.port}/manageConsole/${req.params.sid}`;
      bkLink = false;
    }
    const manageRolesForService = await getSingleUserServiceAndRoles(req);
    const model = {
      csrfToken: req.csrfToken(),
      title: 'DfE Manage',
      subTitle: 'DfE Manage console',
      serviceId: req.params.sid,
      userRoles: manageRolesForService,
      backLink: bkLink,
      tabLink: tbLink,
    };
    return res.render('manageConsole/views/aboutManageConsole', model);
  }
};

module.exports = {
  get,
};
