import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';
import { GiWolfHowl } from 'react-icons/gi';
import { FaChartPie, FaHistory, FaArrowUp, FaArrowDown, FaSignOutAlt, FaRegChartBar, FaTags } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const menuItems = [
    { id: 1, icon: FaChartPie, label: 'Overview', path: '/' },
    { id: 2, icon: FaRegChartBar, label: 'Stats', path: '/stats' },
    { id: 3, icon: FaArrowUp, label: 'Income', path: '/income' },
    { id: 4, icon: FaArrowDown, label: 'Expenses', path: '/expenses' },
    { id: 5, icon: FaHistory, label: 'History', path: '/history' },
    { id: 6, icon: FaTags, label: 'Categories', path: '/categories' }
  ];

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <div className="sidebar-avatar">
          <GiWolfHowl className="sidebar-avatar-icon" />
        </div>
        <p className="sidebar-greeting">Hello, {user.email}</p>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink key={item.id} to={item.path} end={item.path === '/'} className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}>
            <item.icon />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-link sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
