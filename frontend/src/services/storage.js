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

// Get transactions filtered by type (expense or income)
export const getTransactionsByType = (type) => getTransactions().filter((transaction) => transaction.type === type);

// Sum the amounts of all transactions of a given type
// export const getTotalByType = (type) => getTransactionsByType(type).reduce((sum, transaction) => sum + transaction.amount, 0);

// Get the total amount of transactions by type, rounded to 2 decimal places
export const getTotalByType = (type) => {
  const total = getTransactionsByType(type).reduce((sum, transaction) => sum + transaction.amount, 0);
  return Math.round(total * 100) / 100;
};
