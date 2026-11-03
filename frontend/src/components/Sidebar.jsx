import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-profile">{/* Avatar + greeting */}</div>
      <nav className="sidebar-nav">{/* Menu */}</nav>
      <div className="sidebar-footer">{/* Logout */}</div>
    </aside>
  );
};

export default Sidebar;
