const getFaqs = async (req, res) => {
  req.session = null;

  res.render('contact/views/faqs', {
    isHidden: false,
  });
};

module.exports = getFaqs;
