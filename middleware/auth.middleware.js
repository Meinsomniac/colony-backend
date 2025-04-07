const jwt = require("jsonwebtoken");

const generateToken = async (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const verifyToken = async (req, res, next) => {
  const headers = req.header;
  const token = headers.get("Authorization")?.split(" ")[1];
  if (!token)
    res
      .status(401)
      .json({ success: false, message: "Invalid or missing token" });
  else {
    const isTokenValid = jwt.verify(token, process.env.JWT_SECRET);
    console.log(isTokenValid);
  }
  next();
};
