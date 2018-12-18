var express = require("express");
var router = express.Router();
const getHome = require("../controllers/home.js");
const getMenu = require("../controllers/category_menu.js");

/* GET home page. */
router.get("/home", async (req, res, next) => {
  //console.log("Cookies :  ", req.cookies);
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let data = await getHome.get_data(JSON.parse(cookies));
    let menudata = await getMenu.get_menulist();
    res.render("home", {
      data: data,
      menudata: menudata,
      angular: true,
      customjs: true,
      cookies: cookies,
      jslist: [
        "angular/app.js",
        "angular/factory/product_details.js",
        "angular/controllers/home.js",
        "angular/factory/wishlist.js",
        "angular/factory/userbundle.js"
      ]
    });
  } catch (error) {
    console.log(error);

    error_404(res);
  }
});
/* GET home page. */
router.get("/", async (req, res, next) => {
  //console.log("Cookies :  ", req.cookies);
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let data = await getHome.get_data(JSON.parse(cookies));
    let menudata = await getMenu.get_menulist();
    res.render("home-new-kutung", {
      data: data,
      menudata: menudata,
      angular: false,
      customjs: false,
      catdrop: 1,
      cookies: cookies
    });
  } catch (error) {
    console.log(error);

    error_404(res);
  }
});
module.exports = router;
