// src/components/Auth/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Llamar a la función logout del AuthContext
    logout();
    // Redirigir a la página principal
    navigate('/');
  }, [logout, navigate]);

  return (
    <div className="container mt-5 pt-5 text-center">
      <h3>Cerrando sesión...</h3>
      <p>Serás redirigido en un momento.</p>
    </div>
  );
}

export default Logout;
