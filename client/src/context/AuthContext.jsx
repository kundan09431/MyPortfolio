import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const savedToken = localStorage.getItem('adminToken');
      const savedAdmin = localStorage.getItem('adminUser');

      if (savedToken && savedAdmin) {
        try {
          setAdmin(JSON.parse(savedAdmin));
          setToken(savedToken);
          // Verify with backend
          const res = await adminAPI.getProfile();
          if (res.data.success) {
            setAdmin(res.data.data);
            localStorage.setItem('adminUser', JSON.stringify(res.data.data));
          }
        } catch (error) {
          console.warn('[Auth] Token invalid or expired. Logging out.');
          logout();
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await adminAPI.login({ email, password });
      if (res.data.success) {
        const { token, admin } = res.data;
        setToken(token);
        setAdmin(admin);
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(admin));
        return { success: true };
      }
      return { success: false, message: res.data.message || 'Login failed' };
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        'Authentication failed. Please check your credentials.';
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      await adminAPI.logout();
    } catch (e) {
      // ignore
    } finally {
      setAdmin(null);
      setToken(null);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
        setAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
