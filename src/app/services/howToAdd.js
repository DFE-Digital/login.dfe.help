const get = async (req, res) => {
   const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in',
	subTitle: 'DfE Sign-in',
    backLink: true,
  };
  return res.render('services/views/howToAdd', model);
};

module.exports = {
  get,
};
