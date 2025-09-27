import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function DonateForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    monto: '',
    metodo: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, monto, metodo } = formData;

    if (!nombre || !monto || !metodo) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      console.log('Donación registrada:', formData);
      // Aquí iría la lógica para registrar la donación
    }
  };

  return (
    <Container className="mt-4">
      <h3>Formulario de donación</h3>
      {showAlert && <Alert variant="danger">Completa todos los campos.</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Monto a donar</Form.Label>
          <Form.Control type="number" name="monto" value={formData.monto} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Método de pago</Form.Label>
          <Form.Select name="metodo" value={formData.metodo} onChange={handleChange}>
            <option value="">Selecciona un método</option>
            <option value="Nequi">Nequi</option>
            <option value="Daviplata">Daviplata</option>
            <option value="Transferencia">Transferencia bancaria</option>
          </Form.Select>
        </Form.Group>

        <Button variant="warning" type="submit">Donar</Button>
      </Form>
    </Container>
  );
}

export default DonateForm;