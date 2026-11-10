import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useCategories } from '../context/CategoriesContext';
import '../styles/FormSection.css';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { findCustomCategory, updateCategory } = useCategories();
  const category = findCustomCategory(id);
  const [name, setName] = useState(category?.name ?? '');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) return;

    setError('');
    setSubmitting(true);

    try {
      await updateCategory(id, trimmedName);
      navigate('/categories');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (!category) {
    return (
      <section className="section">
        <Link to="/categories" className="back-link">
          <FaArrowLeft />
          <span>Back to Categories</span>
        </Link>
        <p>Custom category not found.</p>
      </section>
    );
  }

  return (
    <section className="section">
      <Link to="/categories" className="back-link">
        <FaArrowLeft />
        <span>Back to Categories</span>
      </Link>

      <h2 className="section-title">Edit Category</h2>
      <p className="section-description">Rename this {category.type} category</p>

      <form className="category-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label" htmlFor="category-name">
            Name
          </label>
          <input id="category-name" className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        {error && <p className="form-error">{error}</p>}
        <div className="btn-container">
          <button className="form-submit" type="submit" disabled={submitting}>
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditCategory;
