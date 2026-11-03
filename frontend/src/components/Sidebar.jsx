import '../styles/Sidebar.css';
import { GiWolfHowl } from 'react-icons/gi';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <div className="sidebar-avatar">
          <GiWolfHowl className="sidebar-avatar-icon" />
        </div>
        <p className="sidebar-greeting">Hello, User</p>
      </div>
      <nav className="sidebar-nav">{/* Menu */}</nav>
      <div className="sidebar-footer">{/* Logout */}</div>
    </aside>
  );
};

export default Sidebar;
