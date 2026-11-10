import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { createCategory, getCategories } from '../controllers/categoryController.js';

const router = Router();

router.use(requireAuth);
router.post('/', createCategory);
router.get('/', getCategories);

export default router;
