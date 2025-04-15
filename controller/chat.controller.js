const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const getAllContacts = async (req, res) => {
  const token = req.get("authorization")?.split(" ")[1];
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    const allContacts = await User.find(
      { _id: { $ne: user._id } },
      {
        select: {
          _id: 1,
        },
      }
    );
    res.status(200).json({ success: true, data: allContacts || [] });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong with fetching contacts",
    });
  }
};

module.exports = { getAllContacts };
