var express = require("express");
var router = express.Router();
const orderDetail = require("../controllers/myorder_detail.js");
var auth = require("../lib/auth.js");

router.get("/:order_id", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let data = await orderDetail.get_data(JSON.parse(cookies), req.params);
    res.render("cancelorder", {
      data: data,
      cookies: cookies,
      search: 0,
      angular: true,
      customjs: true,
      jslist: ["angular/app.js", "angular/controllers/cancelorder.js"]
    });
  } catch (error) {
    error_404(res);
  }
});

module.exports = router;
