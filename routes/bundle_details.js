var express = require("express");
var router = express.Router();
const getBundle = require("../controllers/bundle_details.js");
const getMenu = require("../controllers/category_menu.js");

/* GET home page. */
router.get("/:pb_id/:pb_name", async (req, res, next) => {
  try {
    var pb_id = req.param("pb_id");
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let data = await getBundle.get_data(pb_id, cookies);
    let menudata = await getMenu.get_menulist();
    //console.log(data);
    res.render("bundledetail_new", {
      data: data,
      menudata: menudata,
      cookies: cookies,
      catdrop: 1,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/factory/bundle_review.js",
        "angular/factory/bundle_details.js",
        "angular/controllers/bundle_details.js",
        "angular/factory/wishlist.js",
        "angular/factory/userbundle.js",
        "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/angular-moment/1.2.0/angular-moment.min.js"
      ]
    });
  } catch (error) {
    error_404(res);
  }
});

module.exports = router;
