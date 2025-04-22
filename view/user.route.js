const express = require("express");
const { login, signup, getUserInfo } = require("../controller/user.controller");
const { verifyToken, checkUser } = require("../middleware/auth.middleware");
const passport = require("passport");

const router = express.Router();

router.post("/login", login);
router.post("/signup", checkUser, signup);
router.get("/get-user", verifyToken, getUserInfo);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/redirecting",
    failureRedirect: "http://localhost:3000/login",
  })
);

module.exports = router;
