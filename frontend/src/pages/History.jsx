import TransactionList from '../components/TransactionList';
import { useTransactions } from '../context/TransactionsContext';

const History = () => {
  const { transactions, loading, error } = useTransactions();

  return (
    <section className="section">
      <h2 className="section-title-main">History</h2>

      {loading && <p>Loading transactions...</p>}
      {error && <p>Transactions could not be loaded.</p>}
      {!loading && !error && <TransactionList type="all" transactions={transactions} readOnly />}
    </section>
  );
};

export default History;
