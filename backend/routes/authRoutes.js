const express = require('express');
const { register, login } = require('../controllers/authController');
const { requireAuth } = require('../middleware/requireAuth');
const User = require('../models/User');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    return res.json({ id: user.id, email: user.email });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
