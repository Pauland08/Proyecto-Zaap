import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png';

function NavigationBar() {
  const { currentUser } = useAuth();
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith('/admin') ||
    location.pathname === '/dashboard';

  if (isAdminRoute && currentUser) return null;

  return (
    <Navbar expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} width="110" height="40" alt="Logo" />
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/animals-gallery">Animales</Nav.Link>
            <Nav.Link as={Link} to="/campaigns">Campañas</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
          </Nav>

          <Nav>
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/dashboard">Panel Admin</Nav.Link>
                <Nav.Link as={Link} to="/logout" className="text-danger">
                  Cerrar sesión
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;