import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CategoriesProvider } from '../context/CategoriesContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <CategoriesProvider>
      <Outlet />
    </CategoriesProvider>
  );
};

export default ProtectedRoute;
