import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { createTransaction } from '../controllers/transactionController.js';

const router = Router();

router.use(requireAuth);
router.post('/', createTransaction);

export default router;
