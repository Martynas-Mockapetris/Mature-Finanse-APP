import { FaPlus } from 'react-icons/fa';
import '../styles/CreateNewCategory.css';

const CreateNewCategory = () => {
  const handleCreateNew = () => {
    console.log('Create new category clicked');
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