const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
    backLink: true,
  };
  return res.render('manageUsers/views/addSubServiceToUser', model);
};

module.exports = {
  get,
};