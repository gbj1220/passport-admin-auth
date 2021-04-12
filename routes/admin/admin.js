const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  signUp,
  logIn,
  getAllUsersProfile,
  updateUserProfile,
  deleteUser,
} = require("./controller/adminController");

router.post("/sign-up", signUp);

router.post("/login", logIn);

router.put(
  "/update-profile",
  passport.authenticate("admin-auth", { session: false }),
  updateUserProfile
);

router.get(
  "/get-all-users-profile",
  passport.authenticate("admin-auth", { session: false }),
  getAllUsersProfile
);

router.put("/update-user-profile", updateUserProfile);

router.delete("/delete-user", deleteUser);

module.exports = router;
