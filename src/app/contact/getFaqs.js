const getFaqs = async (req, res) => {
  req.session = null;

  res.render('contact/views/faqs');
};

module.exports = getFaqs;
