import TransactionList from '../components/TransactionList';

const Income = () => {
  return (
    <section className="section">
      <h2 className="section-title-main">Income</h2>
      <TransactionList type="income" />
    </section>
  );
};

export default Income;
