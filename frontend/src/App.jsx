import './App.css';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Stats from './pages/Stats';
import Overview from './pages/Overview';
import History from './pages/History';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import NewCategory from './pages/NewCategory';

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
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/history" element={<History />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/categories/new" element={<NewCategory />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
