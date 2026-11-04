import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { findCategory, addTransaction } from '../services/storage';
import '../styles/FormSection.css';

const AddTransaction = () => {
  const { type, categoryId } = useParams();
  const category = findCategory(type, categoryId);

  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (!value || value <= 0) return;

    addTransaction({ type, categoryId, amount: value, date, note: note.trim() });
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

      <form className="category-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label" htmlFor="amount">
            Amount
          </label>
          <input id="amount" className="form-input" type="number" step="0.01" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input id="date" className="form-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="note">
            Note (optional)
          </label>
          <input id="note" className="form-input" type="text" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>

        <div className="btn-container">
          <button className="form-submit" type="submit">
            Add {type}
          </button>
          <Link to={`/`} className="cancel-link">
            <span>Cancel</span>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default AddTransaction;
