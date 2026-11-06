import { useState } from 'react';
import TransactionList from '../components/TransactionList';
import { deleteTransaction, getTransactions } from '../services/storage';

const History = () => {
  const [transactions, setTransactions] = useState(() => getTransactions());

  const handleDelete = (id) => {
    if (!window.confirm('Delete this transaction?')) return;

    deleteTransaction(id);
    setTransactions(getTransactions());
  };

  return (
    <section className="section">
      <h2 className="section-title-main">History</h2>
      <TransactionList type="all" transactions={transactions} onDelete={handleDelete} />
    </section>
  );
};

export default History;
