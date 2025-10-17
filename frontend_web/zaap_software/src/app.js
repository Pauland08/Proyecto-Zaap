import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';

import NavigationBar from '../src/components/Public/NavigationBar';
import Home from '../src/components/Public/Home';
import AnimalsGallery from '../src/components/Public/AnimalsGallery';
import ReportAnimal from '../src/components/Public/ReportAnimal';
import Contact from '../src/components/Public/Contact';

import Login from '../src/components/Auth/Login';
import Register from '../src/components/Auth/Register';
import RecoverPassword from '../src/components/Auth/RecoverPassword';
import Logout from '../src/components/Auth/Logout';

import Dashboard from '../src/components/AdminPanel/Dashboard';
import Foundation from '../src/components/AdminPanel/Foundation';
import Animals from '../src/components/AdminPanel/Animals';
import AdoptForm from '../src/components/AdminPanel/AdoptForm';
import DonateForm from '../src/components/AdminPanel/DonateForm';
import Users from '../src/components/AdminPanel/Users';
import Volunteers from '../src/components/AdminPanel/Volunteers';
import Reports from '../src/components/AdminPanel/Reports';
import Donations from '../src/components/AdminPanel/Donations';
import Support from '../src/components/AdminPanel/Support';
import Rescues from '../src/components/AdminPanel/Rescues';
import Campaigns from '../src/components/AdminPanel/AdminCampaigns';

import NotFound from '../src/pages/NotFound';

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