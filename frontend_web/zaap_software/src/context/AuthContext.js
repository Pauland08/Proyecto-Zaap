import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  });

  const login = async (correo, password) => {
    const res = await axios.post('http://localhost:5000/auth/login', {
      correo,
      password,
    });

    const token = res.data.access_token || res.data.token;
    if (!token) throw new Error('Token no recibido');

    localStorage.setItem('token', token);

    const decoded = jwtDecode(token);
    setCurrentUser(decoded);

    return decoded;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
