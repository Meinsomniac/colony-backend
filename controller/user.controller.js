const jwt = require("jsonwebtoken");
const { generateTokens } = require("../middleware/auth.middleware");
const User = require("../model/user.model");
const { comparePassword } = require("../utils/hashPassword");

const login = async (req, res) => {
  const payload = req.body;
  const token = req.headers?.Authorization?.split(" ")[1];
  const { username, password } = payload;
  try {
    const user = await User.findOne({
      $or: [{ email: username }, { username }],
    });
    if (!user)
      res
        .status(404)
        .json({ success: false, message: "Entered user not found" });
    else {
      const passwordMatch = await comparePassword(password, user?.password);
      if (passwordMatch) {
        const data = await user.toJSON();
        delete data?.password;
        const [accessToken, refreshToken] = await generateTokens(data);
        res.status(200).json({
          success: true,
          message: "Logged in succcessfully!",
          accessToken,
          refreshToken,
        });
      } else
        res
          .status(401)
          .json({ success: false, message: "Invalid Username or Password" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error?.message || "Something went wrong! try again after sometimes",
    });
  }
};

const signup = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.create(data);
    res.status(200).json({
      success: true,
      message: "Your account created successfully!",
      data: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error?.message || "Something went wrong! try again after sometimes",
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const token = req.get("Authorization")?.split(" ")[1];
    const details = jwt.decode(token, { complete: true }).payload;
    delete details._id;
    delete details.createdAt;
    delete details.updatedAt;
    delete details.__v;
    delete details.iat;
    delete details.exp;
    res.status(200).json({ success: true, data: details });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
    });
  }
};

module.exports = { login, signup, getUserInfo };
