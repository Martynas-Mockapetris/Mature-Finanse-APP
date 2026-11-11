/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { getServerTransactions, createServerTransaction, updateServerTransaction } from '../services/transactionsApi';

const TransactionsContext = createContext(null);

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError('');

    getServerTransactions()
      .then((data) => {
        if (active) setTransactions(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  const addTransaction = async (values) => {
    if (loading || error) {
      throw new Error('Transactions must load before adding a new one.');
    }

    const created = await createServerTransaction(values);
    setTransactions((current) => [...current, created]);
    return created;
  };

  const updateTransaction = async (id, changes) => {
    if (loading || error) {
      throw new Error('Transactions must load before updating one.');
    }

    const updated = await updateServerTransaction(id, changes);
    setTransactions((current) =>
      current.map((transaction) => (transaction.id === id ? updated : transaction))
    );
    return updated;
  };

  return (
    <TransactionsContext.Provider value={{ transactions, loading, error, addTransaction }}>
      {error && (
        <div role="alert">
          <p>Could not load transactions: {error}</p>
          <button type="button" onClick={() => setAttempt((current) => current + 1)}>
            Retry
          </button>
        </div>
      )}
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionsContext);
