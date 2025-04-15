const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const generateTokens = async (data) => {
  const accessToken = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });

  return [accessToken, refreshToken];
};

const verifyToken = async (req, res, next) => {
  const token = req.get("authorization")?.split(" ")[1];
  // const token = headers.get("Authorization")?.split(" ")[1];
  if (!token)
    res
      .status(401)
      .json({ success: false, message: "Invalid or missing token" });
  else {
    try {
      const isTokenValid = jwt.verify(token, process.env.JWT_SECRET);
      if (isTokenValid) {
        next();
      }
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error?.message || "Expired or missing token",
      });
    }
  }
};

const checkUser = async (req, res, next) => {
  const body = req.body;
  const { username, email } = body;
  try {
    const user = await User.findOne({ $or: [{ email }, { username }] });
    const isEmailExist = user?.email === email;
    const isUsernameExist = user?.username === username;
    if (isEmailExist || isUsernameExist) {
      res.status(403).json({
        success: false,
        message: `${isEmailExist ? "Email" : "Username"} is already been used`,
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

module.exports = { generateTokens, verifyToken, checkUser };
