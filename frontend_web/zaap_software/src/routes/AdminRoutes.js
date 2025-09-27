import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Users from '../components/AdminPanel/Users';
import { useAuth } from '../context/AuthContext';
import Foundation from '../components/AdminPanel/Foundation';
import Animals from '../components/AdminPanel/Animals';
import Rescues from '../components/AdminPanel/Rescues';
import Donations from '../components/AdminPanel/Donations';
import Volunteers from '../components/AdminPanel/Volunteers';
import Reports from '../components/AdminPanel/Reports';
import Support from '../components/AdminPanel/Support';


const isAdmin = true; // validación el rol desde el contexto o estado global

function AdminRoutes() {
  const { usuario } = useAuth();

  const esAdmin = usuario?.email === 'admin@gmail.com'; 

  return esAdmin ? (
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
  ) : (
    <Navigate to="/login" />
  );
}

export default AdminRoutes;
