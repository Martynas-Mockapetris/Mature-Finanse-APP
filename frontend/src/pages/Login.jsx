import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/FormSection.css';
import '../styles/Auth.css';

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Mature Finances</h1>
        <h2 className="section-title">Log in</h2>

        <form className="category-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label" htmlFor="login-email">
              Email
            </label>
            <input id="login-email" className="form-input form-input--plain" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <input id="login-password" className="form-input form-input--plain" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="btn-container">
            <button className="form-submit" type="submit" disabled={submitting}>
              {submitting ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </form>

        <p className="auth-switch">
          No account yet? <Link to="/register">Register</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
