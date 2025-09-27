import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function AdoptForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    motivo: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, direccion, telefono, motivo } = formData;

    if (!nombre || !direccion || !telefono || !motivo) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      console.log('Solicitud de adopción enviada:', formData);
      // Aquí iría la lógica para enviar la solicitud
    }
  };

  return (
    <Container className="mt-4">
      <h3>Formulario de adopción</h3>
      {showAlert && <Alert variant="danger">Todos los campos son obligatorios.</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>¿Por qué deseas adoptar?</Form.Label>
          <Form.Control as="textarea" rows={3} name="motivo" value={formData.motivo} onChange={handleChange} />
        </Form.Group>

        <Button variant="success" type="submit">Enviar solicitud</Button>
      </Form>
    </Container>
  );
}

export default AdoptForm;
