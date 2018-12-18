var express = require("express");
var router = express.Router();
var auth = require("../lib/auth.js");

router.get("/", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    res.render("otp", {
      angular: true,
      customjs: true,
      cookies: cookies,
      jslist: [
        "angular/app.js",
        "angular/factory/verify_otp.js",
        "angular/controllers/verify_otp.js"
      ]
    });
  } catch (error) {
    console.log(error);
    error_404(res);
  }
});

module.exports = router;
