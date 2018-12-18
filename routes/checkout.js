var express = require("express");
var router = express.Router();
var checkout = require("../controllers/checkout.js");
var auth = require("../lib/auth.js");
const schedule = require("../controllers/schedule.js");
/* GET cart page. */
router.post("/", auth.ensureAuthenticated, async (req, res, next) => {
  console.log(req.body);
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    if (typeof req.body.cart_id == "string") {
      req.body.cart_id = [req.body.cart_id];
    }
    res.render("payment", {
      cookies: cookies,
      data: req.body,
      angular: true,
      customjs: true,
      search: 0,
      catdrop: 1,
      jslist: [
        "angular/app.js",
        "angular/factory/add_address.js",
        "angular/controllers/checkout.js",
        "angular/factory/cart.js"
      ]
    });
  } catch (error) {
    res.status(401).json({
      error: error
    });
  }
});
router.post("/process", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let cookie = JSON.parse(cookies);
    if (typeof req.body.cart_ids == "string") {
      req.body.cart_ids = [req.body.cart_ids];
    }
    let order = await checkout.orderInit(cookie, req.body);
    if (order) {
      console.log(order);
      res.redirect(
        "/checkout/success/" +
          order.order_id[0] +
          "/" +
          (order.bundle_id == 0 ? "" : order.bundle_id)
      );
      res.end();
    } else {
      res.status(401).json({
        error: error
      });
    }
  } catch (error) {
    console.log(error);

    error_404(res);
  }
});
/* GET cart page. */
router.get(
  "/success/:order_id",
  auth.ensureAuthenticated,
  async (req, res, next) => {
    try {
      let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
      res.render("payment-success", {
        cookies: cookies,
        params: req.params,
        data: 0,
        angular: true,
        customjs: true,
        search: 0,
        catdrop: 1,
        jslist: [
          "angular/app.js",
          "angular/factory/add_address.js",
          "angular/controllers/checkout.js"
        ]
      });
    } catch (error) {
      error_404(res);
    }
  }
);
/* GET cart page. */
router.get(
  "/success/:order_id/:bundle_id",
  auth.ensureAuthenticated,
  async (req, res, next) => {
    try {
      let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
      let valid = await schedule.get_data(
        JSON.parse(cookies),
        req.params.bundle_id
      );
      if (valid.status == 200) {
        var d = valid.response;
      } else {
        var d = 0;
      }
      res.render("payment-success", {
        cookies: cookies,
        params: req.params,
        data: d,
        angular: true,
        customjs: true,
        search: 0,
        jslist: [
          "angular/app.js",
          "angular/factory/add_address.js",
          "angular/controllers/checkout.js"
        ]
      });
    } catch (error) {
      error_404(res);
    }
  }
);
module.exports = router;
