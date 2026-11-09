import { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest, getToken, setToken, clearToken } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(getToken()));

  useEffect(() => {
    if (!getToken()) return;

    apiRequest('/auth/me')
      .then(setUser)
      .catch((error) => {
        if (error.status === 401) clearToken();
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (email, password) => {
    await apiRequest('/auth/register', {
      method: 'POST',
      body: { email, password }
    });
    await login(email, password);
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
