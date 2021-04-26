const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
  };
  return res.render('endUsers/views/whatIsEndUser', model);
};

module.exports = {
  get,
};
