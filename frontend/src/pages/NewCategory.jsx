import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '../services/storage';
import '../styles/NewCategory.css';

const NewCategory = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('expense');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    addCategory({ name: trimmed, type });
    navigate('/');
  };

  return (
    <section className="section">
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
          {' '}
          <label className="form-label" htmlFor="category-type">
            Type
          </label>
          <select id="category-type" className="form-input" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <button className="form-submit" type="submit">
          Create Category
        </button>
      </form>
    </section>
  );
};

export default NewCategory;
