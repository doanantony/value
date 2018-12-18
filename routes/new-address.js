var express = require("express");
var router = express.Router();
const getAddress = require("../controllers/addresslist.js");
const getMenu = require("../controllers/category_menu.js");
var auth = require("../lib/auth.js");

/* Add New Address Page. */
router.get("/", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    var udata = JSON.parse(cookies);
    let userId = udata.user_id;
    let data = "";
    let address_id = "";
    let menudata = await getMenu.get_menulist();

    res.render("new-address", {
      address_id: address_id,
      data: data,
      menudata: menudata,
      cookies: cookies,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/factory/add_address.js",
        "angular/controllers/add_address.js"
      ]
    });
  } catch (error) {
    error_404(res);
  }
});

/* Add New Address Page. */
router.get("/:add_id", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    var udata = JSON.parse(cookies);
    let address_id = req.param("add_id");
    let data = await getAddress.get_address(udata, address_id);
    let menudata = await getMenu.get_menulist();
    res.render("new-address", {
      address_id: address_id,
      data: data,
      menudata: menudata,
      cookies: cookies,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/factory/add_address.js",
        "angular/controllers/add_address.js"
      ]
    });
  } catch (error) {
    error_404(res);
  }
});

module.exports = router;
