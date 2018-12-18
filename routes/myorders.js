var express = require("express");
var router = express.Router();
const getMenu = require("../controllers/category_menu.js");
const myOrders = require("../controllers/myorders.js");
var auth = require("../lib/auth.js");

/* GET product list page. */
router.get("/", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let menudata = await getMenu.get_menulist();
    let data = await myOrders.get_data(JSON.parse(cookies));
    res.render("myorders", {
      menudata: menudata,
      data: data,
      search: 0,
      catdrop: 1,
      cookies: cookies,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/factory/myorders.js",
        "angular/controllers/myorders.js",
        "js/jquery.nice-select.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/angular-moment/1.2.0/angular-moment.min.js"
      ]
    });
  } catch (error) {
    error_404(res);
  }
});

module.exports = router;
