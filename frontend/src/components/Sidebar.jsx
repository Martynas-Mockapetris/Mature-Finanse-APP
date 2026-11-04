import { useState } from 'react';
import '../styles/Sidebar.css';
import { GiWolfHowl } from 'react-icons/gi';
import { FaChartPie, FaHistory, FaArrowUp, FaArrowDown, FaSignOutAlt, FaRegChartBar } from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { id: 0, icon: FaRegChartBar, label: 'Overview' },
    { id: 1, icon: FaChartPie, label: 'Stats' },
    { id: 2, icon: FaHistory, label: 'History' },
    { id: 3, icon: FaArrowUp, label: 'Income' },
    { id: 4, icon: FaArrowDown, label: 'Expenses' }
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
