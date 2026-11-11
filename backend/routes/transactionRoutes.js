import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { createTransaction, getTransactions } from '../controllers/transactionController.js';

const router = Router();

router.use(requireAuth);
router.post('/', createTransaction);
router.get('/', getTransactions);

export default router;
