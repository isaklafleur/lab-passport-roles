const express = require("express");

const siteRoutes = express.Router();

siteRoutes.get("/", (req, res, next) => {
  res.render("index");
});

siteRoutes.get("/private-page", (req, res, next) => {
  if (!req.user) {
    res.redirect("/forbidden-page");
  } else {
    res.send("private page");
  }
});

siteRoutes.get("/forbidden-page", (req, res, next) => {
  res.send("forbidden page");
});

module.exports = siteRoutes;
