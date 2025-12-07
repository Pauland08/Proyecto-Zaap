import React, { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function login({ correo, contraseña }) {
    setLoading(true);
    try {
      const { data } = await api.post('/usuarios/login', { correo, contraseña });
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  }

  async function signup({ nombre, correo, contraseña, rol }) {
    const { data } = await api.post('/usuarios', { nombre, correo, contraseña, rol });
    return data;
  }

  function logout() {
    localStorage.removeItem('token');
    setCurrentUser(null);
    return Promise.resolve();
  }

  const value = { currentUser, login, signup, logout, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}