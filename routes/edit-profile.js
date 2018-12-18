var express = require("express");
var router = express.Router();
const getProfile = require("../controllers/profile.js");
const getMenu = require("../controllers/category_menu.js");
var auth = require("../lib/auth.js");

router.get("/", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    var cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    var udata = JSON.parse(cookies);
    let data = await getProfile.get_data(udata);
    let menudata = await getMenu.get_menulist();
    res.render("edit-profile", {
      data: data,
      menudata: menudata,
      cookies: cookies,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/factory/update_profile.js",
        "angular/controllers/update_profile.js"
      ]
    });
  } catch (error) {
    error_404(res);
  }
});

module.exports = router;
