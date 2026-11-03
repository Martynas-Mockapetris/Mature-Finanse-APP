import './App.css';
import Sidebar from './components/Sidebar';
import ExpensesSection from './components/ExpensesSection';
import IncomeSection from './components/IncomeSection';
import CreateNewCategory from './components/CreateNewTab';

const App = () => {
  return (
    <div className="app-main">
      <header className="app-header">
        <div className="header-title">Mature Finances</div>
      </header>
      <div className="app-container">
        {/* Main content area */}
        <Sidebar />
        <div className="app-content">
          {/* Components */}
          <IncomeSection className="income-section" />
          <ExpensesSection className="expenses-section" />
          <CreateNewCategory />
        </div>
      </div>
    </div>
  );
};

export default App;
