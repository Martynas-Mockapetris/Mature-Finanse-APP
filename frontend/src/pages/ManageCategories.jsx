import { getCategoriesByType, getTransactions, deleteCategory } from '../services/storage';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CategoryCard.css';
import '../styles/ManageCategories.css';
import { GiPriceTag } from 'react-icons/gi';
import { FaPen, FaTrash } from 'react-icons/fa';

const categoryGroups = [
  { type: 'expense', title: 'Custom Expenses' },
  { type: 'income', title: 'Custom Income' }
];

const ManageCategories = () => {
  const [categories, setCategories] = useState(() => [...getCategoriesByType('expense'), ...getCategoriesByType('income')]);

  const handleDelete = (category) => {
    const linkedCount = getTransactions().filter((transaction) => transaction.categoryId === category.id).length;

    const warning = linkedCount === 0 ? `Delete category "${category.name}"?` : `Deleting "${category.name}" will also permanently delete ${linkedCount} transaction${linkedCount === 1 ? '' : 's'}. Continue?`;

    if (!window.confirm(warning)) return;

    const result = deleteCategory(category.id);

    if (!result) {
      window.alert('This category could not be found.');
      return;
    }

    setCategories((current) => current.filter((item) => item.id !== category.id));
  };

  return (
    <section className="section">
      <h2 className="section-title-main">Manage Categories</h2>

      {categoryGroups.map((group) => {
        const groupCategories = categories.filter((category) => category.type === group.type);

        return (
          <section className="managed-category-group" key={group.type}>
            <h3>{group.title}</h3>
            {groupCategories.length === 0 ?
              <p>No custom categories yet.</p>
            : <div className="managed-category-grid">
                {groupCategories.map((category) => (
                  <article key={category.id} className={`category-card category-card--${group.type} category-card--managed`}>
                    <div className="category-icon">
                      <GiPriceTag size={40} />
                    </div>
                    <p className="category-label">{category.name}</p>
                    <div className="managed-category-actions">
                      <Link to={`/categories/${category.id}/edit`} className="managed-category-edit" aria-label={`Edit ${category.name}`} title="Edit category">
                        <FaPen className="managed-category-edit-icon" />
                      </Link>

                      <button type="button" className="managed-category-delete" onClick={() => handleDelete(category)} aria-label={`Delete ${category.name}`} title="Delete category">
                        <FaTrash className="managed-category-delete-icon" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            }
          </section>
        );
      })}
    </section>
  );
};

export default ManageCategories;
