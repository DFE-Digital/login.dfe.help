const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    validationMessages: {},
  };
  return res.render('contact/views/accessOrganisation', model);

};

module.exports = {
  get,
};
