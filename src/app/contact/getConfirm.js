const getConfirm = (req, res) => {
  return res.render('contact/views/confirm', {
    reference: req.session.reference,
  });
};

module.exports = getConfirm;
