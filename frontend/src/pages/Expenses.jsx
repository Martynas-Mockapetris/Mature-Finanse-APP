import TransactionList from '../components/TransactionList';

const Expenses = () => {
  return (
    <section className="section">
      <h2 className="section-title-main">Expenses</h2>
      <TransactionList type="expense" />
    </section>
  );
};

export default Expenses;
