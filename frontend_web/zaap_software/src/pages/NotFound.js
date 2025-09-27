import React from 'react';
import { Container } from 'react-bootstrap';

function NotFound() {
  return (
    <Container className="mt-4 text-center">
      <h2>404 - Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
    </Container>
  );
}

export default NotFound;