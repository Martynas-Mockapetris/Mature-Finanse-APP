import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateNewCategory.css';

const CreateNewCategory = () => {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate('/categories/new');
  };

  return (
    <section className="section">
      <h2 className="section-title">Create New</h2>
      <p className="section-description">Add your own income or expense category</p>
      <button className="create-new-btn" onClick={handleCreateNew}>
        <FaPlus />
        <span>New Category</span>
      </button>
    </section>
  );
};

export default CreateNewCategory;
