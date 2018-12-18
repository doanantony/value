function ensureAuthenticated(req, res, next) {
  let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
  if (cookies == false) {
    res.redirect("/");
    res.end();
  } else {
    next();
  }
}
module.exports = {
  ensureAuthenticated
};
