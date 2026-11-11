import TransactionList from '../components/TransactionList';
import { useTransactions } from '../context/TransactionsContext';

const Transactions = ({ type }) => {
  const { transactions: allTransactions, loading, error, deleteTransaction } = useTransactions();
  const transactions = allTransactions.filter((transaction) => transaction.type === type);
  const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const title = type === 'income' ? 'Income' : 'Expenses';

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
      <h2 className="section-title-main">{title}</h2>
      {loading && <p>Loading transactions...</p>}
      {error && <p>Transactions could not be loaded.</p>}
      {!loading && !error && (
        <>
          <p className="total-amount">
            Total {title}: {total.toFixed(2)}
          </p>
          <TransactionList type={type} transactions={transactions} onDelete={handleDelete} />
        </>
      )}
    </section>
  );
};

export default Transactions;
