import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="app-main">
      <header className="app-header">
        <div className="header-title">Mature Finances</div>
      </header>
      <div className="app-container">
        <Sidebar />
        <div className="app-content" key={location.pathname}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
