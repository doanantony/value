(function(appConfig) {
  "use strict";

  // *** main dependencies *** //
  const createError = require("http-errors");
  const express = require("express");
  const path = require("path");
  const cookieParser = require("cookie-parser");
  const logger = require("morgan");
  const bodyParser = require("body-parser");
  var flash = require("connect-flash");
  var session = require("express-session");
  var moment = require("moment");
  var _ = require("lodash");

  // *** load environment variables *** //
  require("dotenv").config();

  appConfig.init = function(app, express) {
    // view engine setup
    app.set("views", path.join(__dirname, "../views"));
    app.set("view engine", "ejs");

    app.use(logger("dev"));
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true
      })
    );
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use(cookieParser("secret"));
    app.use(
      session({
        secret: "valucart",
        proxy: true,
        resave: true,
        saveUninitialized: true
      })
    );
    app.use(flash());
    /**bodyParser.json(options)
     * Parses the text as JSON and exposes the resulting object on req.body.
     */
    app.use(function(req, res, next) {
      res.locals.flashdata = req.flash();
      res.locals.moment = moment;
      res.locals._ = _;
      res.locals.baseURL = req.headers.host;
      next();
    });
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, "../public")));
  };
})(module.exports);
