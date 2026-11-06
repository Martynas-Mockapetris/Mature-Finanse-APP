import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Stats from './pages/Stats';
import Overview from './pages/Overview';
import Transactions from './pages/Transactions';
import History from './pages/History';
import NewCategory from './pages/NewCategory';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import ManageCategories from './pages/ManageCategories';

const App = () => {
  const location = useLocation();

  return (
    <div className="app-main">
      <header className="app-header">
        <div className="header-title">Mature Finances</div>
      </header>
      <div className="app-container">
        {/* Main content area */}
        <Sidebar />
        <div className="app-content" key={location.pathname}>
          {/* Pages */}
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/income" element={<Transactions type="income" />} />
            <Route path="/expenses" element={<Transactions type="expense" />} />
            <Route path="/history" element={<History />} />
            <Route path="/categories/new" element={<NewCategory />} />
            <Route path="/transactions/new/:type/:categoryId" element={<AddTransaction />} />
            <Route path="/transactions/:id/edit" element={<EditTransaction />} />
            <Route path="/categories" element={<ManageCategories />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
