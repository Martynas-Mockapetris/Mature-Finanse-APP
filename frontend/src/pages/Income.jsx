import { useState } from 'react';
import TransactionList from '../components/TransactionList';
import { getTotalByType, getTransactionsByType, deleteTransaction } from '../services/storage';

const Income = () => {
  const [transactions, setTransactions] = useState(() => getTransactionsByType('income'));

  const handleDelete = (id) => {
    deleteTransaction(id);
    setTransactions(getTransactionsByType('income'));
  };

  return (
    <section className="section">
      <h2 className="section-title-main">Income</h2>
      <p className="total-amount">Total Income: {getTotalByType('income').toFixed(2)}</p>
      <TransactionList type="income" transactions={transactions} onDelete={handleDelete} />
    </section>
  );
};

export default Income;
