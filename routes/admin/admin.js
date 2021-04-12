const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  signUp,
  logIn,
  updateProfile,
} = require("./controller/adminController");

router.post("/sign-up", signUp);

router.post("/login", logIn);

router.put(
  "/update-profile",
  passport.authenticate("admin-user"),
  updateProfile
);

module.exports = router;
