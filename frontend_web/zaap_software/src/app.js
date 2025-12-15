// src/app.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Navbar público
import NavigationBar from './components/Public/NavigationBar';

// Públicas
import Home from './components/Public/Home';
import AnimalsGallery from './components/Public/AnimalsGallery';
import ReportAnimal from './components/Public/ReportAnimal';
import Contact from './components/Public/Contact';
import Campaigns from './components/Public/Campaigns';

// Auth
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import RecoverPassword from './components/Auth/RecoverPassword';
import Logout from './components/Auth/Logout';

// Admin
import Dashboard from './components/AdminPanel/Dashboard';
import Foundation from './components/AdminPanel/Foundation';
import Animals from './components/AdminPanel/Animals';
import AdoptForm from './components/AdminPanel/AdoptForm';
import DonateForm from './components/AdminPanel/DonateForm';
import Users from './components/AdminPanel/Users';
import Volunteers from './components/AdminPanel/Volunteers';
import Reports from './components/AdminPanel/Reports';
import Donations from './components/AdminPanel/Donations';
import Support from './components/AdminPanel/Support';
import Rescues from './components/AdminPanel/Rescues';
import AdminCampaigns from './components/AdminPanel/AdminCampaigns';

// 404
import NotFound from './pages/NotFound';

/* ============================
   RUTA PROTEGIDA SIMPLE
   (SIN archivo extra)
============================ */
function PrivateRoute({ children, roles }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(currentUser.rol)) {
    return <div>Acceso denegado</div>;
  }

  return children;
}

function App() {
  return (
    <Router>
      <NavigationBar />

      <Routes>
        {/* ================== PUBLICAS ================== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<RecoverPassword />} />
        <Route path="/animals-gallery" element={<AnimalsGallery />} />
        <Route path="/report-animal" element={<ReportAnimal />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />

        {/* ================== ADMIN ================== */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <PrivateRoute roles={['Administrador']}>
              <Users />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/foundation"
          element={
            <PrivateRoute roles={['Administrador']}>
              <Foundation />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <PrivateRoute roles={['Administrador']}>
              <Reports />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/rescues"
          element={
            <PrivateRoute roles={['Administrador']}>
              <Rescues />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/support"
          element={
            <PrivateRoute roles={['Administrador']}>
              <Support />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/animals"
          element={
            <PrivateRoute roles={['Administrador', 'Fundacion']}>
              <Animals />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/adoptions"
          element={
            <PrivateRoute roles={['Administrador', 'Fundacion']}>
              <AdoptForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/donations"
          element={
            <PrivateRoute roles={['Administrador']}>
              <DonateForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/volunteers"
          element={
            <PrivateRoute roles={['Administrador']}>
              <Volunteers />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/campaigns"
          element={
            <PrivateRoute roles={['Administrador']}>
              <AdminCampaigns />
            </PrivateRoute>
          }
        />

        {/* ================== 404 ================== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;