var express = require("express");
var router = express.Router();
const getHome = require("../controllers/home.js");
const getMenu = require("../controllers/category_menu.js");

/* GET home page. */
router.get("/", async (req, res, next) => {
  // console.log("Cookies :  ", req.cookies);
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    // let data = await getHome.get_data(JSON.parse(cookies));
    let menudata = await getMenu.get_menulist();
    res.render("home_new", {
      // data: data,
      menudata: menudata,
      search: 0,
      angular: true,
      customjs: true,
      cookies: cookies,
      jslist: [
        "angular/app.js",
        "angular/factory/product_details.js",
        "angular/controllers/home.js",
        "angular/factory/wishlist.js"
      ]
    });
  } catch (error) {
    console.log(error);

    error_404(res);
  }
});

module.exports = router;
