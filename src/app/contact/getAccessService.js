const getAccessService = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
  };
  return res.render('contact/views/accessService', model);
};

module.exports = getAccessService;

