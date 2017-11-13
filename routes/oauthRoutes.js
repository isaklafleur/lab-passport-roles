const express = require("express");
const passport = require("passport");

const oauthRoutes = express.Router();

// facebook
oauthRoutes.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
oauthRoutes.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/users",
    failureRedirect: "/"
  })
);

module.exports = oauthRoutes;
