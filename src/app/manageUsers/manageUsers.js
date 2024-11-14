const config = require("../../infrastructure/config");

const get = async (req, res) => {
  let bkLink = true;
  let tbLink = "";
  if (req.headers.referer === undefined) {
    tbLink = `https://${config.hostingEnvironment.host}:${config.hostingEnvironment.port}/dashboard`;
    bkLink = false;
  }
  const model = {
    csrfToken: req.csrfToken(),
    title: "DfE Sign-in",
    subTitle: "DfE Sign-in",
    backLink: bkLink,
    tabLink: tbLink,
  };
  return res.render("manageUsers/views/manageUsers", model);
};

module.exports = {
  get,
};
