const jwt = require("jsonwebtoken");

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

module.exports = { generateTokens, verifyToken };
