const express = require("express");
const { login, signup, getUserInfo } = require("../controller/user.controller");
const { verifyToken, checkUser } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/login", login);
router.post("/signup", checkUser, signup);
router.get("/get-user", verifyToken, getUserInfo);

module.exports = router;
