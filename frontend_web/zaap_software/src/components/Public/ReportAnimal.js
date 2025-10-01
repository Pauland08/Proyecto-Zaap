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
      // Aquí iría la lógica para enviar el reporte, por ejemplo API fetch
      alert('Reporte enviado correctamente.');
      setFormData({ descripcion: '', ubicacion: '', imagen: null });
    }
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-primary">Reportar Animal en Situación de Calle</h1>
      <p>Ayúdanos reportando un animal en situación vulnerable para brindarle atención y refugio.</p>

      {showAlert && <Alert variant="danger">Todos los campos son obligatorios.</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="descripcion">
          <Form.Label>Descripción del animal</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe las condiciones, características o situación del animal"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ubicacion">
          <Form.Label>Ubicación</Form.Label>
          <Form.Control
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            placeholder="Lugar donde viste al animal"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="imagen">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Enviar reporte</Button>
      </Form>
    </Container>
  );
}

export default ReportAnimal;