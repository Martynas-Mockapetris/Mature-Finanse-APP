import TransactionList from '../components/TransactionList';
import { useTransactions } from '../context/TransactionsContext';

const History = () => {
  const { transactions, loading, error, deleteTransaction } = useTransactions();

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;

    try {
      await deleteTransaction(id);
    } catch (err) {
      window.alert(`Could not delete transaction: ${err.message}`);
    }
  };

  return (
    <section className="section">
      <h2 className="section-title-main">History</h2>

      {loading && <p>Loading transactions...</p>}
      {error && <p>Transactions could not be loaded.</p>}
      {!loading && !error && <TransactionList type="all" transactions={transactions} onDelete={handleDelete} />}
    </section>
  );
};

export default History;
