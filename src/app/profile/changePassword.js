const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
  };
  return res.render('profile/views/changePassword', model);
};

module.exports = {
  get,
};
