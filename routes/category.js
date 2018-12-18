var express = require("express");
var router = express.Router();
const getMenu = require("../controllers/category_menu.js");
var _ = require("lodash");
var auth = require("../lib/auth.js");

/* GET product page. */
router.get("/product", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let menudata = await getMenu.get_menulist();
    res.render("category", {
      cookies: cookies,
      menudata: menudata,
      menudataa: menudata.response,
      search: 0,
      angular: false,
      customjs: false,
      pageto: "product-listing"
    });
  } catch (error) {
    error_404(res);
  }
});
module.exports = router;
/* GET bundle page. */
router.get("/bundle", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let menudata = await getMenu.get_menulist();
    res.render("category", {
      cookies: cookies,
      menudata: menudata.response,
      search: 0,
      angular: false,
      customjs: false,
      pageto: "bundle-list"
    });
  } catch (error) {
    error_404(res);
  }
});
module.exports = router;
