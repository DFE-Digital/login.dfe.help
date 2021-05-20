const get = async (req, res) => {
  res.render('contactUs/views/contactUsCompleted', {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
    isHidden: true,
    backLink: true,
  });
};

module.exports = {
  get,
};
