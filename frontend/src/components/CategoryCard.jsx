import '../styles/CategoryCard.css';

const CategoryCard = ({ icon: Icon, label, onClick }) => {
  return (
    <button className="category-card" onClick={onClick}>
      <div className="category-icon">
        <Icon size={40} />
      </div>
      <p className="category-label">{label}</p>
    </button>
  );
};

export default CategoryCard;
