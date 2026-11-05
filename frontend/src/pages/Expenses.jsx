import { useState } from 'react';
import TransactionList from '../components/TransactionList';
import { getTransactionsByType, getTotalByType, deleteTransaction } from '../services/storage';

const Expenses = () => {
  const [transactions, setTransactions] = useState(() => getTransactionsByType('expense'));

  const handleDelete = (id) => {
    deleteTransaction(id);
    setTransactions(getTransactionsByType('expense'));
  };

  return (
    <section className="section">
      <h2 className="section-title-main">Expenses</h2>
      <p className="total-amount">Total Expenses: {getTotalByType('expense').toFixed(2)}</p>
      <TransactionList type="expense" transactions={transactions} onDelete={handleDelete} />
    </section>
  );
};

export default Expenses;
