import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import TransactionForm from '../components/TransactionForm';
import { findTransaction, findCategory, updateTransaction } from '../services/storage';

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const transaction = findTransaction(id);

  if (!transaction) {
    return (
      <section className="section">
        <Link to="/" className="back-link">
          <FaArrowLeft />
          <span>Back to Overview</span>
        </Link>
        <p>Transaction not found.</p>
      </section>
    );
  }

  const listPath = transaction.type === 'income' ? '/income' : '/expenses';
  const categoryName = findCategory(transaction.type, transaction.categoryId)?.name ?? 'Unknown category';

  const handleSubmit = (values) => {
    updateTransaction(id, values);
    navigate(listPath);
  };

  return (
    <section className="section">
      <Link to={listPath} className="back-link">
        <FaArrowLeft /> Back
      </Link>
      <h2 className="section-title">
        Edit {transaction.type} - {categoryName}
      </h2>
      <p className="section-description">Change the details of this transaction</p>

      <TransactionForm
        type={transaction.type}
        initialValues={{ categoryId: transaction.categoryId, amount: transaction.amount, date: transaction.date, note: transaction.note }}
        submitLabel="Save changes"
        cancelTo={listPath}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default EditTransaction;
