import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png';

function AdminNavbar() {
  const { currentUser } = useAuth();
  const location = useLocation();

  const adminMenuItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/admin/users', label: 'Gestión de usuarios' },
    { path: '/admin/foundation', label: 'Fundación' },
    { path: '/admin/rescues', label: 'Rescates' },
    { path: '/admin/animals', label: 'Animales' },
    { path: '/admin/adoptions', label: 'Adopciones' },
    { path: '/admin/campaigns', label: 'Campañas y Eventos' },
    { path: '/admin/donations', label: 'Donaciones' },
    { path: '/admin/volunteers', label: 'Voluntariado' },
  ];

  if (!currentUser) return null;

  return (
    <Navbar expand="lg" fixed="top" bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand as={Link} to="/dashboard">
          <img
            src={logo}
            width="110"
            height="40"
            className="d-inline-block align-top me-2"
            style={{ objectFit: 'contain' }}
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto">
            {adminMenuItems.map(({ path, label }) => (
              <Nav.Link
                key={path}
                as={Link}
                to={path}
                className={location.pathname === path ? 'active' : ''}
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/" className="btn-nav-primary">
              Volver al inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/logout" className="text-danger">
              Cerrar Sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;