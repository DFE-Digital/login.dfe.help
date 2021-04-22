const getEmailPasswordHelp = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
    backLink: true,
  };
  return res.render('contact/views/emailPasswordHelp', model);
};

module.exports = getEmailPasswordHelp;

