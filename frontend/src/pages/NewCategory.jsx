import { useState } from 'react';
import '../styles/NewCategory.css';

const NewCategory = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('expense');

  return (
    <section className="section">
      <h2 className="section-title">New Category</h2>
      <p className="section-description">Create your own income or expense category</p>

      <form className="category-form">
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
