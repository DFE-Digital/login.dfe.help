const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
  };
  return res.render('profile/views/setupAccount', model);
};

module.exports = {
  get,
};
