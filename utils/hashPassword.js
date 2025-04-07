const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  const result = await bcrypt.hash(password, 10);
  return result;
};

exports.comparePassword = async (newPassword, prevPassword) => {
  const result = await bcrypt.compare(newPassword, prevPassword);
  return result;
};
