const getConfirm = (req, res) => {
  return res.render('contact/views/confirm', {
    isHidden: true,
  });
};

module.exports = getConfirm;
