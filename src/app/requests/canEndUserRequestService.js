const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: "DfE Sign-in",
    subTitle: "DfE Sign-in",
  };
  return res.render("requests/views/canEndUserRequestService", model);
};

module.exports = {
  get,
};
