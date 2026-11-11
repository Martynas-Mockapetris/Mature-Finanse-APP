import { apiRequest } from './api';

export const getServerTransactions = () => {
  return apiRequest('/transactions');
};

export const createServerTransaction = (values) => {
  return apiRequest('/transactions', {
    method: 'POST',
    body: values
  });
};
