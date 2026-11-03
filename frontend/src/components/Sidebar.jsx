import '../styles/Sidebar.css';
import { GiWolfHowl } from 'react-icons/gi';
import { FaChartPie, FaHistory, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { id: 1, icon: FaChartPie, label: 'Stats' },
    { id: 2, icon: FaHistory, label: 'History' },
    { id: 3, icon: FaArrowUp, label: 'Income' },
    { id: 4, icon: FaArrowDown, label: 'Expenses' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <div className="sidebar-avatar">
          <GiWolfHowl className="sidebar-avatar-icon" />
        </div>
        <p className="sidebar-greeting">Hello, User</p>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button key={item.id} className="sidebar-link">
            <item.icon />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">{/* Logout */}</div>
    </aside>
  );
};

export default Sidebar;
