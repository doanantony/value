var express = require("express");
var router = express.Router();
const getshoppingList = require("../controllers/myshoppinglist.js");
const getMenu = require("../controllers/category_menu.js");
var auth = require("../lib/auth.js");

/* GET product list page. */
router.get("/", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let shopingList = await getshoppingList.getshoppinglist(
      JSON.parse(cookies),
      ""
    );
    let menudata = await getMenu.get_menulist();
    res.render("myshopping-dashboard", {
      data: shopingList,
      menudata: menudata,
      angular: true,
      customjs: true,
      cookies: cookies,
      jslist: [
        "angular/app.js",
        "angular/factory/myshipping.js",
        "angular/controllers/myshipping.js"
      ]
    });
  } catch (error) {
    error_404(res);
  }
});

module.exports = router;
