import TransactionList from '../components/TransactionList';
import { getTotalByType } from '../services/storage';
const Income = () => {
  return (
    <section className="section">
      <h2 className="section-title-main">Income</h2>
      <p className="total-amount">Total Income: {getTotalByType('income').toFixed(2)}</p>
      <TransactionList type="income" />
    </section>
  );
};

export default Income;
