// const productRouter = require("./product.route");
// const petRouter = require("./pet.route");
const userRouter = require("./user.route");
const chatRouter = require("./chat.route");
const express = require("express");

const router = express.Router();

// router.use("/api", productRouter);
// router.use("/api", petRouter);
router.use("/api", chatRouter);
router.use("/auth", userRouter);

router.use("/check", (req, res) => {
  res.status(200).json({ success: true, message: "Working properly" });
});

module.exports = router;
