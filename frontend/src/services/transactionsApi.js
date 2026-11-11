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

export const updateServerTransaction = (id, changes) => {
  return apiRequest(`/transactions/${id}`, {
    method: 'PATCH',
    body: changes
  });
};

export const deleteServerTransaction = (id) => {
  return apiRequest(`/transactions/${id}`, {
    method: 'DELETE'
  });
};
