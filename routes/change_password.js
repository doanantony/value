var express = require("express");
var router = express.Router();
var auth = require("../lib/auth.js");
/* change password. */
router.get("/", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    res.render("change-password", {
      cookies: cookies,
      angular: true,
      customjs: true,
      jslist: ["angular/app.js", "angular/controllers/change_password.js"]
    });
  } catch (error) {
    error_404(res);
  }
});
module.exports = router;
