const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in',
    subTitle: 'DfE Sign-in',
    backLink: false,
  };
  return res.render('dashboard/views/dashboard', model);
};

module.exports = {
  get,
};
