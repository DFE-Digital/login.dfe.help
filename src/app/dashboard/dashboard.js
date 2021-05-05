const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
    backLink: false,
  };
  return res.render('dashboard/views/dashboard', model);
};

module.exports = {
  get,
};
