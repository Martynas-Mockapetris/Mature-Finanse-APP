import { apiRequest } from './api';

export const getServerTransactions = () => {
  return apiRequest('/transactions');
};
