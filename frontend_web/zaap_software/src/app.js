import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import NavigationBar from './components/Public/NavigationBar';
import Home from './components/Public/Home';
import AnimalsGallery from './components/Public/AnimalsGallery';
import ReportAnimal from './components/Public/ReportAnimal';
import Contact from './components/Public/Contact';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import RecoverPassword from './components/Auth/RecoverPassword';
import Logout from './components/Auth/Logout';

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
import Campaigns from './components/AdminPanel/AdminCampaigns';

import NotFound from './pages/NotFound';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Login />;
}

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<RecoverPassword />} />
        <Route path="/animals-gallery" element={<AnimalsGallery />} />
        <Route path="/report-animal" element={<ReportAnimal />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />

        {/* Rutas protegidas admin */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin/foundation" element={<PrivateRoute><Foundation /></PrivateRoute>} />
        <Route path="/admin/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
        <Route path="/admin/rescues" element={<PrivateRoute><Rescues /></PrivateRoute>} />
        <Route path="/admin/support" element={<PrivateRoute><Support /></PrivateRoute>} />
        <Route path="/admin/animals" element={<PrivateRoute><Animals /></PrivateRoute>} />
        <Route path="/admin/adoptions" element={<PrivateRoute><AdoptForm /></PrivateRoute>} />
        <Route path="/admin/campaigns" element={<PrivateRoute><Campaigns /></PrivateRoute>} />
        <Route path="/admin/donations" element={<PrivateRoute><DonateForm /></PrivateRoute>} />
        <Route path="/admin/volunteers" element={<PrivateRoute><Volunteers /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><Users /></PrivateRoute>} />

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;