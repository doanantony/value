var express = require("express");
var router = express.Router();
const cart = require("../controllers/cart.js");
const getMenu = require("../controllers/category_menu.js");
var _ = require("lodash");
var auth = require("../lib/auth.js");

/* GET cart page. */
router.get("/", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let menudata = await getMenu.get_menulist();
    let datas = await cart.get_data(JSON.parse(cookies));
    // if (_.isEmpty(data) == true) {
    //   throw data;
    // }
    console.log(data);

    var data = datas.cartItems;
    var pendingBundle =
      datas.pendingBundle == undefined ? [] : datas.pendingBundle;
    var cart_sum = 0;
    if (!_.isEmpty(data)) {
      data.forEach(function(cart_total) {
        cart_sum += Number(cart_total.price) * Number(cart_total.quantity);
      });
    } else {
      data = [];
    }
    res.render("mycart", {
      data: data,
      pendingBundle: pendingBundle,
      cookies: cookies,
      menudata: menudata,
      cart_sum: cart_sum,
      angular: true,
      customjs: true,
      catdrop: 1,
      jslist: [
        "angular/app.js",
        "angular/factory/cart.js",
        "angular/controllers/cart.js",
        "angular/factory/wishlist.js"
      ]
    });
  } catch (error) {
    console.log(error);

    error_404(res);
  }
});
module.exports = router;
