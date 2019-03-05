const getVerificationEmailHelp = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
  };
  return res.render('contact/views/verificationEmailHelp', model);
};

module.exports = getVerificationEmailHelp;