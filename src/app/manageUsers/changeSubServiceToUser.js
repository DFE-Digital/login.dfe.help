const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: "DfE Sign-in",
    backLink: true,
  };
  return res.render("manageUsers/views/changeSubServiceToUser", model);
};

module.exports = {
  get,
};
