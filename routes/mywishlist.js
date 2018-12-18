var express = require("express");
var router = express.Router();
const getMyWishlist = require("../controllers/mywishlist.js");
const getMenu = require("../controllers/category_menu.js");
var auth = require("../lib/auth.js");

router.get("/", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let data = await getMyWishlist.get_mywishlist(JSON.parse(cookies));
    let menudata = await getMenu.get_menulist();
    res.render("mywishlist", {
      data: data,
      menudata: menudata,
      cookies: cookies,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/factory/wishlist.js",
        "angular/controllers/mywishlist.js"
      ]
    });
  } catch (error) {
    error_404(res);
  }
});

module.exports = router;
