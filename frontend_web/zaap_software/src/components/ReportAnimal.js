import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function ReportAnimal() {
  const [formData, setFormData] = useState({
    descripcion: '',
    ubicacion: '',
    imagen: null
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.descripcion || !formData.ubicacion || !formData.imagen) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      console.log('Reporte enviado:', formData);
      // Aquí iría la lógica para enviar el reporte
    }
  };

  return (
    <Container className="mt-4">
      <h3>Reportar animal en situación de calle</h3>
      <p>Ayúdanos reportando un animal en situación vulnerable para brindarle atención y refugio.</p>
      {showAlert && <Alert variant="danger">Todos los campos son obligatorios.</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Descripción del animal</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ubicación</Form.Label>
          <Form.Control
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="file"
            name="imagen"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Enviar reporte</Button>
      </Form>
    </Container>
  );
}

export default ReportAnimal;