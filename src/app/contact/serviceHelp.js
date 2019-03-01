const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    validationMessages: {},
  };
  res.render('contact/views/serviceHelp', model);

};


const post = async (req, res) => {

};

module.exports = {
  get,
  post,
};
