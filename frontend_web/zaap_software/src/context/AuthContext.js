// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función para iniciar sesión (local)
  function login(userData) {
    return new Promise((resolve) => {
      setCurrentUser(userData);
      setUsuario(userData);
      resolve(userData);
    });
  }

  // Función para cerrar sesión
  function logout() {
    setCurrentUser(null);
    setUsuario(null);
    // Retornar una promesa para compatibilidad
    return Promise.resolve();
  }

  // Función simulada para registro
  function signup(email, password, displayName = '') {
    return new Promise((resolve) => {
      const newUser = {
        email,
        displayName,
        uid: 'user-' + Date.now()
      };
      resolve(newUser);
    });
  }

  // Función simulada para reset password
  function resetPassword(email) {
    return new Promise((resolve) => {
      console.log('Reset password para:', email);
      resolve();
    });
  }

  const value = {
    currentUser,
    usuario,
    login,
    signup,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}