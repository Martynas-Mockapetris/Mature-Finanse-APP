import CategoryCard from './CategoryCard';
import { GiPriceTag } from 'react-icons/gi';
import { getCategoriesByType } from '../services/storage';
import { defaultIncomeCategories } from '../data/defaultCategories';
import '../styles/IncExpSection.css';

const IncomeSection = () => {

  const savedCategories = getCategoriesByType('income').map((category) => ({
    id: category.id,
    icon: GiPriceTag,
    name: category.name
  }));

  const incomeCategories = [...defaultIncomeCategories, ...savedCategories];

  const handleCategoryClick = (category) => {
    console.log('Income category clicked:', category.name);
  };

  return (
    <section className="section">
      <h2 className="section-title">My Income</h2>
      <p className="section-description">Track and manage your income by category</p>
      <div className="categories-grid">
        {incomeCategories.map((category) => (
          <CategoryCard key={category.id} icon={category.icon} label={category.name} onClick={() => handleCategoryClick(category)} type="income" />
        ))}
      </div>
    </section>
  );
};

export default IncomeSection;
