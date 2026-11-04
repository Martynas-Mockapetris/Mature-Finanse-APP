import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { findCategory } from '../services/storage';
import '../styles/FormSection.css';

const AddTransaction = () => {
  const { type, categoryId } = useParams();
  const category = findCategory(type, categoryId);

  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState('');

  if (!category) {
    return <p>Category not found.</p>;
  }

  return (
    <section className="section">
      <Link to={`/${type}`} className="back-link">
        <FaArrowLeft /> Back
      </Link>
      <h2 className="section-title">
        Add {type} - {category.name}
      </h2>
      <p className="section-description">Record a new {type} in this category</p>

      <form className="category-form">
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

        <button className="form-submit" type="submit">
          Add {type}
        </button>
      </form>
    </section>
  );
};

export default AddTransaction;
