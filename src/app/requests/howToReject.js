const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
  };
  return res.render('requests/views/howToReject', model);
};

module.exports = {
  get,
};
