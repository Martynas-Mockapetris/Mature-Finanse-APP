import TransactionList from '../components/TransactionList';
import { getTotalByType } from '../services/storage';

const Expenses = () => {
  return (
    <section className="section">
      <h2 className="section-title-main">Expenses</h2>
      <p className="total-amount">Total Expenses: {getTotalByType('expense').toFixed(2)}</p>
      <TransactionList type="expense" />
    </section>
  );
};

export default Expenses;
