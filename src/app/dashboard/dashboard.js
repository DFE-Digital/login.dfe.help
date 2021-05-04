const get = async (req, res, showContactFormSubmitted) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
    backLink: false,
    showContactFormSubmitted,
  };
  return res.render('dashboard/views/dashboard', model);
};

module.exports = {
  get,
};
