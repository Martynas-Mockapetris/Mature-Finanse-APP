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
