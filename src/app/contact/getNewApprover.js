const getNewApprover = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
  };
  return res.render('contact/views/newApprover', model);
};

module.exports = getNewApprover;
