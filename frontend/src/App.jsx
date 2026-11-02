import './App.css';
import ExpensesSection from './components/ExpensesSection';
import IncomeSection from './components/IncomeSection';

const App = () => {
  return (
    <div className="app-main">
      <header className="app-header">
        <div className="header-title">Mature Finances</div>
      </header>
      <div className="app-container">
        {/* Main content area */}
        <div className="app-content">
          {/* Components */}
          <IncomeSection className="income-section" />
          <ExpensesSection className="expenses-section" />
        </div>
      </div>
    </div>
  );
};

export default App;
