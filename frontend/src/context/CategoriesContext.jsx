import { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import { defaultExpenseCategories, defaultIncomeCategories } from '../data/defaultCategories';

const CategoriesContext = createContext(null);

export const CategoriesProvider = ({ children }) => {
  const [customCategories, setCustomCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest('/categories')
      .then(setCustomCategories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addCategory = async ({ name, type }) => {
    const created = await apiRequest('/categories', { method: 'POST', body: { name, type } });
    setCustomCategories((current) => [...current, created]);
    return created;
  };

  const getCategoriesByType = (type) => customCategories.filter((category) => category.type === type);

  const getAvailableCategories = (type) => {
    const defaults = type === 'income' ? defaultIncomeCategories : defaultExpenseCategories;
    return [...defaults, ...getCategoriesByType(type)];
  };

  const findCategory = (type, id) => getAvailableCategories(type).find((category) => category.id === id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="form-error">{error}</p>;

  return <CategoriesContext.Provider value={{ addCategory, getCategoriesByType, getAvailableCategories, findCategory }}>{children}</CategoriesContext.Provider>;
};

export const useCategories = () => useContext(CategoriesContext);
