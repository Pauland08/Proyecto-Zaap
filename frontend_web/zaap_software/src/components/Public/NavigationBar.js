// src/components/Public/NavigationBar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png'; 

function NavigationBar() {
  const { currentUser, usuario } = useAuth();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/dashboard';

  if (isAdminRoute && (currentUser || usuario)) {
    return null; // No mostrar navbar en admin
  }

  return (
    <Navbar expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-logo">
          <img
            src={logo}
            width="110"
            height="40"
            style={{ objectFit: 'contain' }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-even-spacing">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/animals-gallery">Ver Animales</Nav.Link>
            <Nav.Link as={Link} to="/campaigns">Campañas</Nav.Link>
            <Nav.Link as={Link} to="/contact">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/report-animal">Reportar Animal</Nav.Link>
          </Nav>

          <Nav className="auth-links">
            {currentUser || usuario ? (
              <>
                <Nav.Link as={Link} to="/dashboard" className="btn-nav-outline me-2">
                  Panel Admin
                </Nav.Link>
                <Nav.Link as={Link} to="/logout" className="btn-nav-primary">
                  Cerrar Sesión
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="btn-nav-primary me-2">
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="btn-nav-outline">
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;