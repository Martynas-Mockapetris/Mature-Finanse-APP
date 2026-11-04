import CategoryCard from './CategoryCard';
import { GiShoppingCart, GiReceiveMoney, GiTakeMyMoney, GiPartyPopper, GiPriceTag } from 'react-icons/gi';
import { getCategoriesByType } from '../services/storage';
import '../styles/IncExpSection.css';

const ExpensesSection = () => {
  const defaultCategories = [
    { id: 1, icon: GiReceiveMoney, label: 'Bills' },
    { id: 2, icon: GiShoppingCart, label: 'Groceries' },
    { id: 3, icon: GiTakeMyMoney, label: 'Subscriptions' },
    { id: 4, icon: GiPartyPopper, label: 'Entertainment' }
  ];

  const savedCategories = getCategoriesByType('expense').map((category) => ({
    id: category.id,
    icon: GiPriceTag,
    label: category.name
  }));

  const expenseCategories = [...defaultCategories, ...savedCategories];

  const handleCategoryClick = (category) => {
    console.log('Expense category clicked:', category.label);
  };

  return (
    <section className="section">
      <h2 className="section-title">My Expenses</h2>
      <p className="section-description">Track and manage your expenses by category</p>
      <div className="categories-grid">
        {expenseCategories.map((category) => (
          <CategoryCard key={category.id} icon={category.icon} label={category.label} onClick={() => handleCategoryClick(category)} type="expense" />
        ))}
      </div>
    </section>
  );
};

export default ExpensesSection;
