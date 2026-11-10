import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useCategories } from '../context/CategoriesContext';
import '../styles/FormSection.css';

const NewCategory = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('expense');

  const navigate = useNavigate();
  const { addCategory } = useCategories();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setError('');
    setSubmitting(true);

    try {
      await addCategory({ name: trimmed, type });
      navigate('/');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <section className="section">
      <Link to={`/`} className="back-link">
        <FaArrowLeft /> Back
      </Link>
      <h2 className="section-title">New Category</h2>
      <p className="section-description">Create your own income or expense category</p>

      <form className="category-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label" htmlFor="category-name">
            Name
          </label>
          <input id="category-name" className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Pets" />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="category-type">
            Type
          </label>
          <select id="category-type" className="form-input" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {error && <p className="form-error">{error}</p>}
        <div className="btn-container">
          <button className="form-submit" type="submit" disabled={submitting}>
            Create Category
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewCategory;
