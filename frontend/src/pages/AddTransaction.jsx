import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { findCategory, addTransaction } from '../services/storage';
import TransactionForm from '../components/TransactionForm';
import '../styles/FormSection.css';

const AddTransaction = () => {
  const { type, categoryId } = useParams();
  const category = findCategory(type, categoryId);

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

      <TransactionForm initialValues={{ amount: '', date: new Date().toISOString().slice(0, 10), note: '' }} submitLabel={`Add ${type}`} cancelTo="/" onSubmit={handleSubmit} />
    </section>
  );
};

export default AddTransaction;
