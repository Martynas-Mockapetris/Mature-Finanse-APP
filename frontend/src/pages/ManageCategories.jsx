import { getCategoriesByType } from '../services/storage';
import '../styles/ManageCategories.css';
import { GiPriceTag } from 'react-icons/gi';

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
            : <ul className="managed-category-list">
                {categories.map((category) => (
                  <article key={category.id} className={`category-card category-card--${group.type} category-card--managed`}>
                    <div className="category-icon">
                      <GiPriceTag size={40} />
                    </div>
                    <p className="category-label">{category.name}</p>
                  </article>
                ))}
              </ul>
            }
          </section>
        );
      })}
    </section>
  );
};

export default ManageCategories;
