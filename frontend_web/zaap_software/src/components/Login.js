import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      console.log('Inicio de sesión:', { email, password });
    }
  };

  return (
    <Container className="mt-4">
      <h3>Inicio de sesión</h3>
      {showAlert && <Alert variant="danger">Completa todos los campos.</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </Form.Group>

        <Button variant="primary" type="submit">Ingresar</Button>
      </Form>
    </Container>
  );
}

export default Login;