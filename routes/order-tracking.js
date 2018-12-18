var express = require("express");
var router = express.Router();
const getMenu = require("../controllers/category_menu.js");

/* GET product list page. */
router.get("/", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let menudata = await getMenu.get_menulist();
    res.render("order-tracking", {
      menudata: menudata,
      angular: false,
      customjs: false,
      cookies: cookies
    });
  } catch (error) {
    console.log(error);
    error_404(res);
  }
});

module.exports = router;
