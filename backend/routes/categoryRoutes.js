import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { createCategory } from '../controllers/categoryController.js';

const router = Router();

router.use(requireAuth);
router.post('/', createCategory);

export default router;
