import { FaPlus } from 'react-icons/fa';
import '../styles/CreateNewCategory.css';

const CreateNewCategory = () => {
  const handleCreateNew = () => {
    console.log('Create new category clicked');
  };

  return (
    <section className="section">
      <h2 className="section-create-title">Create New</h2>
      <p className="section-create-description">Add your own income or expense category</p>
      <button className="create-new-btn" onClick={handleCreateNew}>
        <FaPlus />
        <span>New Category</span>
      </button>
    </section>
  );
};

export default CreateNewCategory;
