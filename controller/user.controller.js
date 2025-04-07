const User = require("../model/user.model");
const { comparePassword } = require("../utils/hashPassword");

const login = async (req, res) => {
  const payload = req.body;
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
        res.status(200).json({
          success: true,
          message: "Logged in succcessfully!",
          data: user,
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

module.exports = { login, signup };
