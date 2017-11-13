const express = require("express");

// Require Auth Middleware
const auth = require("../middlewares/auth");

// Require UserController
const userController = require("../controllers/userController");

const userRoutes = express.Router();

/* List all users */
userRoutes.get(
  "/",
  auth.ensureAuthenticated("/auth/login"),
  userController.list("users/index")
);

// EDIT single user by id
userRoutes.get(
  "/:id/edit",
  auth.ensureAuthenticated("/auth/login"),
  userController.edit("users/edit")
);

// UPDATE single user
userRoutes.post(
  "/:id/update",
  auth.ensureAuthenticated("/auth/login"),
  userController.update("/users")
);

module.exports = userRoutes;
