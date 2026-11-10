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

// Remove a transaction by id
export const deleteTransaction = (id) => {
  const remaining = getTransactions().filter((transaction) => transaction.id !== id);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(remaining));
};

// Find a single transaction by id
export const findTransaction = (id) => getTransactions().find((transaction) => transaction.id === id);

// Update fields of a transaction by id
export const updateTransaction = (id, changes) => {
  const updated = getTransactions().map((transaction) => (transaction.id === id ? { ...transaction, ...changes } : transaction));
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
};

// Remove all transactions linked to a category
export const deleteTransactionsByCategory = (categoryId) => {
  const remaining = getTransactions().filter((transaction) => transaction.categoryId !== categoryId);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(remaining));
};
