const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  if (typeof password !== 'string' || password.length === 0) {
    throw new Error('Password must be a non-empty string.');
  }

  if (Buffer.byteLength(password, 'utf8') > 72) {
    throw new Error('Password must be at most 72 UTF-8 bytes.');
  }

  return bcrypt.hash(password, 12);
};

module.exports = { hashPassword };
