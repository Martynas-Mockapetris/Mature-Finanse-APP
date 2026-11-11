import { isValidObjectId } from 'mongoose';
import { Category } from '../models/Category.js';
import { Transaction } from '../models/Transaction.js';

// Default category IDs for income and expense types
const defaultCategoryIds = {
  expense: ['expense-bills', 'expense-groceries', 'expense-subscriptions', 'expense-entertainment'],
  income: ['income-work', 'income-freelance', 'income-dividends', 'income-stocks']
};

// Validate date in YYYY-MM-DD format
const isValidDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

// Check if a category is allowed for the user (either default or owned by the user)
const isAllowedCategory = async (categoryId, type, userId) => {
  if (defaultCategoryIds[type].includes(categoryId)) {
    return true;
  }

  if (!isValidObjectId(categoryId)) {
    return false;
  }

  const category = await Category.findOne({
    _id: categoryId,
    userId,
    type
  });

  return Boolean(category);
};

// Create a new transaction for the authenticated user
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
    if (!(await isAllowedCategory(categoryId, type, req.userId))) {
      return res.status(400).json({ message: 'Invalid category.' });
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

// Get transactions for the authenticated user, optionally filtered by type
const getTransactions = async (req, res, next) => {
  const { type } = req.query;

  if (type !== undefined && !['income', 'expense'].includes(type)) {
    return res.status(400).json({ message: 'Type must be income or expense.' });
  }

  try {
    const filter = { userId: req.userId };

    if (type) {
      filter.type = type;
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });

    return res.json(
      transactions.map((transaction) => ({
        id: transaction.id,
        type: transaction.type,
        categoryId: transaction.categoryId,
        amount: transaction.amount,
        date: transaction.date,
        note: transaction.note
      }))
    );
  } catch (error) {
    return next(error);
  }
};

// Update an existing transaction for the authenticated user
const updateTransaction = async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ message: 'Transaction not found.' });
  }

  if (!changes || typeof changes !== 'object' || Array.isArray(changes)) {
    return res.status(400).json({ message: 'Provide fields to update.' });
  }

  const allowedFields = ['categoryId', 'amount', 'date', 'note'];
  const fields = Object.keys(changes);

  if (fields.length === 0 || fields.some((field) => !allowedFields.includes(field))) {
    return res.status(400).json({ message: 'Provide valid fields to update.' });
  }

  if ('categoryId' in changes && (typeof changes.categoryId !== 'string' || !changes.categoryId)) {
    return res.status(400).json({ message: 'A category is required.' });
  }

  if ('amount' in changes && (typeof changes.amount !== 'number' || !Number.isFinite(changes.amount) || changes.amount <= 0)) {
    return res.status(400).json({ message: 'Amount must be a positive number.' });
  }

  if ('date' in changes && !isValidDate(changes.date)) {
    return res.status(400).json({ message: 'Enter a valid date in YYYY-MM-DD format.' });
  }

  if ('note' in changes && typeof changes.note !== 'string') {
    return res.status(400).json({ message: 'Note must be text.' });
  }

  try {
    const transaction = await Transaction.findOne({ _id: id, userId: req.userId });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }

    if ('categoryId' in changes && !(await isAllowedCategory(changes.categoryId, transaction.type, req.userId))) {
      return res.status(400).json({ message: 'Invalid category.' });
    }

    for (const field of fields) {
      transaction[field] = changes[field];
    }

    await transaction.save();

    return res.json({
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

// Delete an existing transaction for the authenticated user
const deleteTransaction = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ message: 'Transaction not found.' });
  }

  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      userId: req.userId
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

export { createTransaction, getTransactions, updateTransaction, deleteTransaction };
