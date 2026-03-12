import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFullProfile = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo && userInfo.token) {
        try {
          const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          };
          const { data } = await axios.get('http://localhost:5000/api/auth/profile', config);
          setUser({ ...userInfo, ...data });
        } catch (error) {
          console.error('Failed to fetch profile', error);
          setUser(userInfo);
        }
      }
      setLoading(false);
    };

    fetchFullProfile();
  }, []);

  /*const login = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true, user: data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  }; */
  /*const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      );

      const userData = {
        ...data.user,
        token: data.token
      };*/

      const login = async (email, password) => {
  try {
    const { data } = await axios.post(
      'http://localhost:5000/api/auth/login',
      { email, password }
    );

    const userData = data;   // ✅ FIX HERE

      setUser(userData);
      localStorage.setItem('userInfo', JSON.stringify(userData));

      return { success: true, user: userData };

    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
