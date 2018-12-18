var express = require("express");
var router = express.Router();
const orderDetail = require("../controllers/myorder_detail.js");
var auth = require("../lib/auth.js");

/* GET order details page. */
router.get("/:order_id", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let data = await orderDetail.get_data(JSON.parse(cookies), req.params);
    res.render("myorder-details", {
      data: data,
      angular: false,
      search: 0,
      catdrop: 1,
      customjs: false,
      cookies: cookies
    });
  } catch (error) {
    console.log(error);
    error_404(res);
  }
});

module.exports = router;
