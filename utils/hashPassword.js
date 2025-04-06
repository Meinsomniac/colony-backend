const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  const result = await bcrypt.hash(password, 10);
  return result;
};

exports.comparePassword = async (prevPassword, newPassword) => {
  const result = await bcrypt.compare(prevPassword, newPassword);
  return result;
};
