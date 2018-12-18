var express = require("express");
var router = express.Router();
const getMenu = require("../controllers/category_menu.js");
const getList = require("../controllers/userbundle.js");
var auth = require("../lib/auth.js");

/* GET user bundle list page. */
router.get("/", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let menudata = await getMenu.get_menulist();
    let data = await getList.get_mybundle(JSON.parse(cookies));
    console.log(data);
    res.render("mybundles", {
      menudata: menudata,
      data: data,
      catdrop: 1,
      search: 0,
      cookies: cookies,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/factory/mybundles.js",
        "angular/controllers/mybundles.js",
        "js/jquery.nice-select.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/angular-moment/1.2.0/angular-moment.min.js"
      ]
    });
  } catch (error) {
    console.log(error);
    error_404(res);
  }
});

/* Delete userbundle */
router.get(
  "/delete/:bundleId",
  auth.ensureAuthenticated,
  async (req, res, next) => {
    try {
      let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
      let data = await getList.deleteBundle(
        JSON.parse(cookies),
        req.param("bundleId")
      );
      res.redirect("/mybundles");
      res.end();
    } catch (error) {
      console.log(error);
      error_404(res);
    }
  }
);
/**
 * View userbundle
 */
router.get(
  "/view/:bundleId",
  auth.ensureAuthenticated,
  async (req, res, next) => {
    try {
      let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
      let menudata = await getMenu.get_menulist();
      res.render("mybundle-edit", {
        menudata: menudata,
        catdrop: 1,
        cookies: cookies,
        bundleId: req.param("bundleId"),
        angular: true,
        customjs: true,
        jslist: [
          "angular/app.js",
          "angular/controllers/userbundle.js",
          "angular/factory/userbundle.js",
          "angular/factory/mybundles.js"
        ]
      });
    } catch (error) {
      error_404(res);
    }
  }
);
router.post(
  "/createbundle",
  auth.ensureAuthenticated,
  async (req, res, next) => {
    try {
      let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
      let createBundle = await getList.create_bundle_withname(
        JSON.parse(cookies),
        req.body.bundlename
      );
      if (createBundle) {
        res.writeHead(302, {
          Location: "/product-listing"
        });
        res.end();
      }
    } catch (error) {
      error_404(res);
    }
  }
);
module.exports = router;
