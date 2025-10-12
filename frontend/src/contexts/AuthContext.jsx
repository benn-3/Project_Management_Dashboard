import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      // Optionally verify token or set user from token
      setUser({ token });
    }
  }, [token]);

  const login = async (email, password, role) => {
    try {
      const res = await axios.post('http://localhost:3000/login', { email, password, role });
      setToken(res.data.token);
      setUser({ role: res.data.role });
      localStorage.setItem('token', res.data.token);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      const res = await axios.post('http://localhost:3000/signup', userData);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
