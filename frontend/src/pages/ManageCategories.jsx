import { getCategoriesByType } from '../services/storage';
import { Link } from 'react-router-dom';
import '../styles/CategoryCard.css';
import '../styles/ManageCategories.css';
import { GiPriceTag } from 'react-icons/gi';
import { FaPen } from 'react-icons/fa';

const categoryGroups = [
  { type: 'expense', title: 'Custom Expenses' },
  { type: 'income', title: 'Custom Income' }
];

const ManageCategories = () => {
  return (
    <section className="section">
      <h2 className="section-title-main">Manage Categories</h2>

      {categoryGroups.map((group) => {
        const categories = getCategoriesByType(group.type);

        return (
          <section className="managed-category-group" key={group.type}>
            <h3>{group.title}</h3>
            {categories.length === 0 ?
              <p>No custom categories yet.</p>
            : <div className="managed-category-grid">
                {categories.map((category) => (
                  <article key={category.id} className={`category-card category-card--${group.type} category-card--managed`}>
                    <div className="category-icon">
                      <GiPriceTag size={40} />
                    </div>
                    <p className="category-label">{category.name}</p>
                    <Link to={`/categories/${category.id}/edit`} className="managed-category-edit" aria-label={`Edit ${category.name}`} title="Edit category">
                      <FaPen className="managed-category-edit-icon" />
                    </Link>
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
