const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in',
    backLink: true,
  };
  return res.render('services/views/havingTrouble', model);
};

module.exports = {
  get,
};
