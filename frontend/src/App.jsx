import ExpensesSection from './components/ExpensesSection';
import './App.css';

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
          <ExpensesSection />
        </div>
      </div>
    </div>
  );
};

export default App;
