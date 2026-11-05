import { useState } from 'react';
import TransactionList from '../components/TransactionList';
import { getTotalByType, getTransactionsByType, deleteTransaction } from '../services/storage';

const Transactions = ({ type }) => {
  const [transactions, setTransactions] = useState(() => getTransactionsByType(type));
  const title = type === 'income' ? 'Income' : 'Expenses';

  const handleDelete = (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    deleteTransaction(id);
    setTransactions(getTransactionsByType(type));
  };

  return (
    <section className="section">
      <h2 className="section-title-main">{title}</h2>
      <p className="total-amount">
        Total {title}: {getTotalByType(type).toFixed(2)}
      </p>
      <TransactionList type={type} transactions={transactions} onDelete={handleDelete} />
    </section>
  );
};

export default Transactions;
