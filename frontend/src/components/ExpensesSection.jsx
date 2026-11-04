import CategoryCard from './CategoryCard';
import { GiPriceTag } from 'react-icons/gi';
import { defaultExpenseCategories } from '../data/defaultCategories';
import { getCategoriesByType } from '../services/storage';
import '../styles/IncExpSection.css';

const ExpensesSection = () => {
  const savedCategories = getCategoriesByType('expense').map((category) => ({
    id: category.id,
    icon: GiPriceTag,
    name: category.name
  }));

  const expenseCategories = [...defaultExpenseCategories, ...savedCategories];

  const handleCategoryClick = (category) => {
    console.log('Expense category clicked:', category.name);
  };

  return (
    <section className="section">
      <h2 className="section-title">My Expenses</h2>
      <p className="section-description">Track and manage your expenses by category</p>
      <div className="categories-grid">
        {expenseCategories.map((category) => (
          <CategoryCard key={category.id} icon={category.icon} label={category.name} onClick={() => handleCategoryClick(category)} type="expense" />
        ))}
      </div>
    </section>
  );
};

export default ExpensesSection;
