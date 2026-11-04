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