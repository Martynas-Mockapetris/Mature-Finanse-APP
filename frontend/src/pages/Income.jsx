import { useState } from 'react';
import TransactionList from '../components/TransactionList';
import { getTotalByType, getTransactionsByType } from '../services/storage';
const Income = () => {
  const [transactions, setTransactions] = useState(() => getTransactionsByType('income'));

  return (
    <section className="section">
      <h2 className="section-title-main">Income</h2>
      <p className="total-amount">Total Income: {getTotalByType('income').toFixed(2)}</p>
      <TransactionList type="income" transactions={transactions} />
    </section>
  );
};

export default Income;
