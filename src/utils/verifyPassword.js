const bcrypt = require('bcryptjs');

const verifyPassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

module.exports = verifyPassword;
