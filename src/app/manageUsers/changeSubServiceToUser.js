const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: "DfE Sign-in",
  };
  return res.render("manageUsers/views/changeSubServiceToUser", model);
};

module.exports = {
  get,
};
