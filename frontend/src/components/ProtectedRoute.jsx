import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CategoriesProvider } from '../context/CategoriesContext';
import { TransactionsProvider } from '../context/TransactionsContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <CategoriesProvider>
      <TransactionsProvider key={user.id}>
        <Outlet />
      </TransactionsProvider>
    </CategoriesProvider>
  );
};

export default ProtectedRoute;
