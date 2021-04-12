const express = require("express");
const router = express.Router();
const passport = require("passport");

const { signUp, logIn, updateProfile } = require("./controller/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/sign-up", signUp);

router.post("/login", logIn);

router.put("/update-profile", passport.authenticate("jwt-user"), updateProfile);

module.exports = router;
