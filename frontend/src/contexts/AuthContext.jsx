import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 1. Define the Base URL dynamically
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email, password) => {
    // 2. Use the dynamic API_URL
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user || { email });
  };

  const signup = async (name, email, password, role) => {
    // 3. Use the dynamic API_URL
    await axios.post(`${API_URL}/auth/signup`, { name, email, password, role });
    await login(email, password);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};