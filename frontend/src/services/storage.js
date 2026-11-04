const CATEGORIES_KEY = 'categories';

export const getCategories = () => {
  const stored = localStorage.getItem(CATEGORIES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addCategory = ({ name, type }) => {
  const categories = getCategories();
  const newCategory = { id: crypto.randomUUID(), name, type };
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify([...categories, newCategory]));
  return newCategory;
};
