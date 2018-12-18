var express = require("express");
var router = express.Router();
var auth = require("../lib/auth.js");
const getMenu = require("../controllers/category_menu.js");
const schedule = require("../controllers/schedule.js");

/* GET SCHEDULE list page. */
router.get("/create/:id", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    // let menudata = await getMenu.get_menulist();
    let valid = await schedule.get_data(JSON.parse(cookies), req.params.id);
    if (valid.status == 200) {
      res.render("schedule", {
        // menudata: menudata,
        data: valid.response,
        angular: false,
        customjs: false,
        search: 0,
        catdrop: 1,
        cookies: cookies
      });
    } else {
      throw "error";
    }
  } catch (error) {
    error_404(res);
  }
});
/* GET SCHEDULE list page. */
router.get("/edit/:id", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    // let menudata = await getMenu.get_menulist();
    let valid = await schedule.get_data(JSON.parse(cookies), req.params.id);
    if (valid.status == 200) {
      res.render("schedule_edit", {
        // menudata: menudata,
        data: valid.response,
        angular: false,
        customjs: false,
        search: 0,
        catdrop: 1,
        cookies: cookies
      });
    } else {
      throw "error";
    }
  } catch (error) {
    error_404(res);
  }
});
/* GET product list page. */
router.post("/success", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let valid = await schedule.savedata(JSON.parse(cookies), req.body);
    if (valid.status == 200 && valid.response.length > 0) {
      res.render("schedule_success", {
        // menudata: menudata,
        data: valid.response[0],
        angular: false,
        customjs: false,
        search: 0,
        cookies: cookies
      });
    } else {
      throw "error";
    }
  } catch (error) {
    error_404(res);
  }
});

module.exports = router;
