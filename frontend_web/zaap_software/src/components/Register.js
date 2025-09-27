import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, email, password, confirmPassword } = formData;

    if (!nombre || !email || !password || password !== confirmPassword) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      console.log('Registro exitoso:', formData);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Registro de usuario</h3>
      {showAlert && <Alert variant="danger">Verifica los campos y que las contraseñas coincidan.</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu correo"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Crea una contraseña"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repite la contraseña"
          />
        </Form.Group>

        <Button variant="primary" type="submit">Registrarse</Button>
      </Form>
    </Container>
  );
}

export default Register;