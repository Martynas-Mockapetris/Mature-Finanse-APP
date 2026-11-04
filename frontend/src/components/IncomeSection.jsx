import CategoryCard from './CategoryCard';
import { GiBriefcase, GiMoneyStack, GiDiamonds, GiStockpiles, GiPriceTag } from 'react-icons/gi';
import { getCategoriesByType } from '../services/storage';
import '../styles/IncExpSection.css';

const IncomeSection = () => {
  const defaultCategories = [
    { id: 1, icon: GiBriefcase, label: 'Work' },
    { id: 2, icon: GiMoneyStack, label: 'Freelance' },
    { id: 3, icon: GiDiamonds, label: 'Dividends' },
    { id: 4, icon: GiStockpiles, label: 'Stocks' }
  ];

  const savedCategories = getCategoriesByType('income').map((category) => ({
    id: category.id,
    icon: GiPriceTag,
    label: category.name
  }));

  const incomeCategories = [...defaultCategories, ...savedCategories];

  const handleCategoryClick = (category) => {
    console.log('Income category clicked:', category.label);
  };

  return (
    <section className="section">
      <h2 className="section-title">My Income</h2>
      <p className="section-description">Track and manage your income by category</p>
      <div className="categories-grid">
        {incomeCategories.map((category) => (
          <CategoryCard key={category.id} icon={category.icon} label={category.label} onClick={() => handleCategoryClick(category)} type="income" />
        ))}
      </div>
    </section>
  );
};

export default IncomeSection;
