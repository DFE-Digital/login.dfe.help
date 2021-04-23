const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
  };
  return res.render('endUsers/views/endUsers', model);
};

module.exports = {
  get,
};
