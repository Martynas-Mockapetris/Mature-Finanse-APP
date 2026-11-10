import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { User } from '../models/User.js';

const router = Router();

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

export default router;
