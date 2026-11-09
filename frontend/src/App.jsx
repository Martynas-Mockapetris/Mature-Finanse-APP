import './App.css';
import { Routes, Route } from 'react-router-dom';
import Stats from './pages/Stats';
import Overview from './pages/Overview';
import Transactions from './pages/Transactions';
import History from './pages/History';
import NewCategory from './pages/NewCategory';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import ManageCategories from './pages/ManageCategories';
import EditCategory from './pages/EditCategory';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/AppLayout';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/income" element={<Transactions type="income" />} />
          <Route path="/expenses" element={<Transactions type="expense" />} />
          <Route path="/history" element={<History />} />
          <Route path="/categories/new" element={<NewCategory />} />
          <Route path="/transactions/new/:type/:categoryId" element={<AddTransaction />} />
          <Route path="/transactions/:id/edit" element={<EditTransaction />} />
          <Route path="/categories" element={<ManageCategories />} />
          <Route path="/categories/:id/edit" element={<EditCategory />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
