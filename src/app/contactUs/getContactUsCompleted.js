const get = async (req, res) => {
  // link to go back to sign in (if user not authenticated) will point to either redirectUri or services page
  const redirectUri = req.query.redirect_uri;
  res.render("contactUs/views/contactUsCompleted", {
    csrfToken: req.csrfToken(),
    title: "DfE Sign-in",
    isHidden: true,
    isHomeTopHidden: true,
    redirectUri,
  });
};

module.exports = {
  get,
};
