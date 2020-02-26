const bcrypt = require('bcryptjs');

const hashPassword = async (password, saltRounds = 12) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

module.exports = hashPassword;
