// src/AdminRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Users from './components/AdminPanel/Users';
import Foundation from './components/AdminPanel/Foundation';
import Animals from './components/AdminPanel/Animals';
import Rescues from './components/AdminPanel/Rescues';
import Donations from './components/AdminPanel/Donations';
import Volunteers from './components/AdminPanel/Volunteers';
import Reports from './components/AdminPanel/Reports';
import Support from './components/AdminPanel/Support';

export default function AdminRoutes() {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/login" />;
  if (currentUser.rol !== 'Administrador') return <Navigate to="/" />;

  return (
    <Routes>
      <Route path="/admin/usuarios" element={<Users />} />
      <Route path="/admin/fundacion" element={<Foundation />} />
      <Route path="/admin/animales" element={<Animals />} />
      <Route path="/admin/rescates" element={<Rescues />} />
      <Route path="/admin/donaciones" element={<Donations />} />
      <Route path="/admin/voluntariado" element={<Volunteers />} />
      <Route path="/admin/reportes" element={<Reports />} />
      <Route path="/admin/soporte" element={<Support />} />
    </Routes>
  );
}