var express = require("express");
var router = express.Router();
var _ = require("lodash");
const getsearch = require("../controllers/search.js");

/* GET home page. */
router.get("/", async (req, res, next) => {
  //console.log("Cookies :  ", req.cookies);
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let data = await getsearch.get_data(req.query.q);
    let d = _.isObject(data.response[0]) ? data.response[0] : 1;
    switch (d.type) {
      case "product":
        res.redirect(
          "/product-detail/" + d.id + "/" + d.name.replace(/\s+/g, "-")
        );
        break;
      case "brand":
        res.redirect("/product-listing/" + "#!?brand=" + d.id);
        break;
      case "bundle":
        res.redirect(
          "/bundle-detail/" + d.id + "/" + d.name.replace(/\s+/g, "-")
        );
        break;
      case "category":
        res.redirect(
          "/product-listing/" + d.id + "/" + d.name.replace(/\s+/g, "-")
        );
        break;
      case "sub-category":
        res.redirect(
          "/product-listing/" +
            d.main_id +
            "/" +
            d.value.replace(/\s+/g, "-") +
            "#!?sub_cat=" +
            d.id
        );
        break;
      default:
        req.flash("warning", "No Result Found!!");
        res.redirect("/");
    }
    // res.status(200).json(data.response);
  } catch (error) {
    console.log(error);

    error_404(res);
  }
});
/* GET home page. */
router.get("/", async (req, res, next) => {
  //console.log("Cookies :  ", req.cookies);
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let data = await getHome.get_data(JSON.parse(cookies));
    let menudata = await getMenu.get_menulist();
    res.render("home-new-kutung", {
      data: data,
      menudata: menudata,
      angular: false,
      customjs: false,
      catdrop: 1,
      cookies: cookies
    });
  } catch (error) {
    console.log(error);

    error_404(res);
  }
});
module.exports = router;
