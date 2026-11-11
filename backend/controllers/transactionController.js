import { isValidObjectId } from 'mongoose';
import { Category } from '../models/Category.js';
import { Transaction } from '../models/Transaction.js';

const defaultCategoryIds = {
  expense: ['expense-bills', 'expense-groceries', 'expense-subscriptions', 'expense-entertainment'],
  income: ['income-work', 'income-freelance', 'income-dividends', 'income-stocks']
};

const isValidDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const createTransaction = async (req, res, next) => {
  const { type, categoryId, amount, date, note = '' } = req.body ?? {};

  if (!['income', 'expense'].includes(type)) {
    return res.status(400).json({ message: 'Type must be income or expense.' });
  }

  if (typeof categoryId !== 'string' || !categoryId) {
    return res.status(400).json({ message: 'A category is required.' });
  }

  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: 'Amount must be a positive number.' });
  }

  if (!isValidDate(date)) {
    return res.status(400).json({ message: 'Enter a valid date in YYYY-MM-DD format.' });
  }

  if (typeof note !== 'string') {
    return res.status(400).json({ message: 'Note must be text.' });
  }

  try {
    const isDefault = defaultCategoryIds[type].includes(categoryId);

    if (!isDefault) {
      if (!isValidObjectId(categoryId)) {
        return res.status(400).json({ message: 'Invalid category.' });
      }

      const category = await Category.findOne({
        _id: categoryId,
        userId: req.userId,
        type
      });

      if (!category) {
        return res.status(400).json({ message: 'Invalid category.' });
      }
    }

    const transaction = await Transaction.create({
      userId: req.userId,
      type,
      categoryId,
      amount,
      date,
      note
    });

    return res.status(201).json({
      id: transaction.id,
      type: transaction.type,
      categoryId: transaction.categoryId,
      amount: transaction.amount,
      date: transaction.date,
      note: transaction.note
    });
  } catch (error) {
    return next(error);
  }
};

export { createTransaction };
