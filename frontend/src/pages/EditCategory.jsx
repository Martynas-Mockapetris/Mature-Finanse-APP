import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { findCustomCategory, updateCategory } from '../services/storage';
import '../styles/FormSection.css';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const category = findCustomCategory(id);
  const [name, setName] = useState(category?.name ?? '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) return;

    const updatedCategory = updateCategory(id, trimmedName);

    if (updatedCategory) {
      navigate('/categories');
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

        <div className="btn-container">
          <button className="form-submit" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditCategory;
