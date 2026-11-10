import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { addTransaction } from '../services/storage';
import { useCategories } from '../context/CategoriesContext';
import TransactionForm from '../components/TransactionForm';

const AddTransaction = () => {
  const { type, categoryId } = useParams();
  const { findCategory } = useCategories();
  const category = findCategory(type, categoryId);

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    addTransaction({ type, categoryId, ...values });
    navigate('/');
  };

  if (!category) {
    return (
      <section className="section">
        <Link to="/" className="back-link">
          <FaArrowLeft />
          <span>Back to Overview</span>
        </Link>
        <p>Category not found.</p>
      </section>
    );
  }

  return (
    <section className="section">
      <Link to={`/`} className="back-link">
        <FaArrowLeft /> Back
      </Link>
      <h2 className="section-title">
        Add {type} - {category.name}
      </h2>
      <p className="section-description">Record a new {type} in this category</p>

      <TransactionForm type={type} initialValues={{ categoryId, amount: '', date: new Date().toISOString().slice(0, 10), note: '' }} submitLabel={`Add ${type}`} cancelTo="/" onSubmit={handleSubmit} />
    </section>
  );
};

export default AddTransaction;
