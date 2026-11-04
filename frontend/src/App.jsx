import './App.css';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';

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
          {/* Pages */}
          <Overview />
        </div>
      </div>
    </div>
  );
};

export default App;
