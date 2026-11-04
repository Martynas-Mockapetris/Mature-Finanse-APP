import { useState } from 'react';
import '../styles/Sidebar.css';
import { GiWolfHowl } from 'react-icons/gi';
import { FaChartPie, FaHistory, FaArrowUp, FaArrowDown, FaSignOutAlt, FaRegChartBar } from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { id: 1, icon: FaRegChartBar, label: 'Overview' },
    { id: 2, icon: FaArrowUp, label: 'Income' },
    { id: 3, icon: FaArrowDown, label: 'Expenses' },
    { id: 4, icon: FaChartPie, label: 'Stats' },
    { id: 5, icon: FaHistory, label: 'History' }
  ];

  const [active, setActive] = useState('Stats');

  const handleLogout = () => {
    console.log('Logout clicked');
  };

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
          <button key={item.id} className={`sidebar-link ${active === item.label ? 'sidebar-link--active' : ''}`} onClick={() => setActive(item.label)}>
            <item.icon />
            <span>{item.label}</span>
          </button>
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
