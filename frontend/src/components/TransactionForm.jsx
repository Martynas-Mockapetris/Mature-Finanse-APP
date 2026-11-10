import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../context/CategoriesContext';
import '../styles/FormSection.css';

const TransactionForm = ({ type, initialValues, submitLabel, cancelTo, onSubmit }) => {
  const [amount, setAmount] = useState(initialValues.amount);
  const [date, setDate] = useState(initialValues.date);
  const [note, setNote] = useState(initialValues.note);
  const [categoryId, setCategoryId] = useState(initialValues.categoryId);
  const { getAvailableCategories } = useCategories();
  const categories = getAvailableCategories(type);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (!value || value <= 0 || !date) return;

    onSubmit({ categoryId, amount: value, date, note: note.trim() });
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="form-label" htmlFor="category">
          Category
        </label>
        <select id="category" className="form-input" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
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
          {submitLabel}
        </button>
        <Link to={cancelTo} className="cancel-link">
          <span>Cancel</span>
        </Link>
      </div>
    </form>
  );
};

export default TransactionForm;
