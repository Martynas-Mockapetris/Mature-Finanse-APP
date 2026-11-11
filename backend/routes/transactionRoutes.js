import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { createTransaction, getTransactions, updateTransaction } from '../controllers/transactionController.js';

const router = Router();

router.use(requireAuth);
router.post('/', createTransaction);
router.get('/', getTransactions);
router.patch('/:id', updateTransaction);

export default router;
