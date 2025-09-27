// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import ReportAnimal from './components/ReportAnimal';
import Register from './components/Register';
import Campaigns from './pages/Campaigns';
import NotFound from './pages/NotFound';
import AdoptForm from './components/AdoptForm';
import DonateForm from './components/DonateForm';
import AdminRoutes from './routes/AdminRoutes';
import Contact from './components/Contact';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/reportar" element={<ReportAnimal />} />
        <Route path="/campañas" element={<Campaigns />} />
        <Route path="/adopta" element={<AdoptForm />} />
        <Route path="/dona" element={<DonateForm />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/*" element={<AdminRoutes />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;