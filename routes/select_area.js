var express = require("express");
var router = express.Router();
const selectArea = require("../controllers/select_area.js");

/* GET select page. */
router.get("/:city_id", async (req, res, next) => {
  try {
    let city_id = req.param("city_id");
    let data = await selectArea.get_data(city_id);
    // let dloocal = localStorage.getItem();
    // console.log("TCL: dloocal", dloocal);

    res.render("select-area", {
      data: data,
      angular: true,
      customjs: true,
      jslist: ["angular/app.js", "angular/controllers/select_area.js"]
    });
  } catch (error) {
    console.log(error);
    error_404(res);
  }
});

module.exports = router;
