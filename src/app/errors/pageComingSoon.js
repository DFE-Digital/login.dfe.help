const { getSingleUserServiceAndRoles } = require("../manageConsole/utils");
const get = async (req, res) => {
  if (req.params.sid !== undefined && req.isAuthenticated()) {
    const manageRolesForService = await getSingleUserServiceAndRoles(req);
    const model = {
      csrfToken: req.csrfToken(),
      title: "DfE Manage",
      subTitle: "DfE Manage console",
      serviceId: req.params.sid,
      userRoles: manageRolesForService,
    };
    return res.render("errors/views/pageComingSoon", model);
  }
};

module.exports = {
  get,
};
