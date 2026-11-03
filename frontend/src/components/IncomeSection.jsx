import CategoryCard from './CategoryCard';
import { GiBriefcase, GiMoneyStack, GiDiamonds, GiStockpiles } from 'react-icons/gi';
import '../styles/IncomeSection.css';

const IncomeSection = () => {
  const incomeCategories = [
    { id: 1, icon: GiBriefcase, label: 'Work' },
    { id: 2, icon: GiMoneyStack, label: 'Freelance' },
    { id: 3, icon: GiDiamonds, label: 'Dividends' },
    { id: 4, icon: GiStockpiles, label: 'Stocks' }
  ];

  const handleCategoryClick = (category) => {
    console.log('Income category clicked:', category.label);
  };

  return (
    <section className="section">
      <h2 className="section-income-title">My Income</h2>
      <p className="section-income-description">Track and manage your income by category</p>
      <div className="categories-grid">
        {incomeCategories.map((category) => (
          <CategoryCard key={category.id} icon={category.icon} label={category.label} onClick={() => handleCategoryClick(category)} type="income" />
        ))}
      </div>
    </section>
  );
};

export default IncomeSection;
