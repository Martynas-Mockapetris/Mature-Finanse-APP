import { defaultExpenseCategories, defaultIncomeCategories } from '../data/defaultCategories';

const CATEGORIES_KEY = 'categories';

// Get all categories from local storage
export const getCategories = () => {
  const stored = localStorage.getItem(CATEGORIES_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Add a new category to local storage
export const addCategory = ({ name, type }) => {
  const categories = getCategories();
  const newCategory = { id: crypto.randomUUID(), name, type };
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify([...categories, newCategory]));
  return newCategory;
};

// Get categories filtered by type (expense or income)
export const getCategoriesByType = (type) => getCategories().filter((category) => category.type === type);

// Find a category by type and ID, including default and user-added categories
export const findCategory = (type, id) => {
  const defaults = type === 'income' ? defaultIncomeCategories : defaultExpenseCategories;
  return [...defaults, ...getCategoriesByType(type)].find((category) => category.id === id);
};

// Get and add transactions to local storage
const TRANSACTIONS_KEY = 'transactions';

// Get all transactions from local storage
export const getTransactions = () => {
  const stored = localStorage.getItem(TRANSACTIONS_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Add a new transaction to local storage
export const addTransaction = ({ type, categoryId, amount, date, note }) => {
  const transactions = getTransactions();
  const newTransaction = { id: crypto.randomUUID(), type, categoryId, amount, date, note };
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify([...transactions, newTransaction]));
  return newTransaction;
};