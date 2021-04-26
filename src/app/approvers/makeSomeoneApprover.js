const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
  };
  return res.render('approvers/views/makeSomeoneApprover', model);
};

module.exports = {
  get,
};
