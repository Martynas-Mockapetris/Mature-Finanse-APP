const User = require('../models/User');
const { hashPassword } = require('../utils/password');

const register = async (req, res, next) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ message: 'Enter a valid email address.' });
  }

  if (password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters and at most 72 UTF-8 bytes.'
    });
  }

  try {
    const passwordHash = await hashPassword(password);
    const user = await User.create({ email: normalizedEmail, passwordHash });

    return res.status(201).json({
      id: user.id,
      email: user.email
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    return next(error);
  }
};

module.exports = { register };
