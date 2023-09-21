const get = async (req, res) => {
   const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in',
	subTitle: 'DfE Sign-in',
    backLink: true,
  };
  return res.render('requests/views/howToApprove', model);
};

module.exports = {
  get,
};
