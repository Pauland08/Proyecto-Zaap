import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavigationBar() {
  const { usuario } = useAuth();
  const esAdmin = usuario?.email === 'admin@gmail.com';

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">ZAAP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/"><i className="bi bi-house-door"></i> Inicio</Nav.Link>
            <Nav.Link as={Link} to="/adopta"><i className="bi bi-heart-fill"></i> Adopta</Nav.Link>
            <Nav.Link as={Link} to="/dona"><i className="bi bi-cash-coin"></i> Dona</Nav.Link>
            <Nav.Link as={Link} to="/reportar"><i className="bi bi-exclamation-circle"></i> Reportar animal</Nav.Link>
            <Nav.Link as={Link} to="/campañas"><i className="bi bi-megaphone"></i> Campañas</Nav.Link>
            {esAdmin && (
              <>
                <Nav.Link as={Link} to="/admin/usuarios">Usuarios</Nav.Link>
                <Nav.Link as={Link} to="/admin/animales">Animales</Nav.Link>
                <Nav.Link as={Link} to="/admin/donaciones">Donaciones</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {usuario ? (
              <Nav.Link as={Link} to="/logout">Cerrar sesión</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login"><i className="bi bi-box-arrow-in-right"></i> Iniciar sesión</Nav.Link>
                <Nav.Link as={Link} to="/registro"><i className="bi bi-person-plus"></i> Registrarse</Nav.Link>
                <Nav.Link as={Link} to="/contacto"><i className="bi bi-envelope"></i> Contacto</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
