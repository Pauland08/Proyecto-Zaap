import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

function DonateForm() {
  const [donations, setDonations] = useState([
    { id: 1, nombre: 'Carlos Perez', email: 'carlos@gmail.com', monto: 50, medioPago: 'Tarjeta', fecha: '2025-09-20' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana@gmail.com', monto: 100, medioPago: 'Transferencia', fecha: '2025-09-22' },
    { id: 3, nombre: 'Laura Ruiz', email: 'laura@gmail.com', monto: 25, medioPago: 'Paypal', fecha: '2025-09-24' },
    { id: 4, nombre: 'Miguel Herrera', email: 'miguel@gmail.com', monto: 75, medioPago: 'Efectivo', fecha: '2025-09-25' },
    { id: 5, nombre: 'Sofía López', email: 'sofia@gmail.com', monto: 200, medioPago: 'Tarjeta', fecha: '2025-09-26' },
    { id: 6, nombre: 'Juan Díaz', email: 'juan@gmail.com', monto: 150, medioPago: 'Transferencia', fecha: '2025-09-27' },
    { id: 7, nombre: 'María Torres', email: 'maria@gmail.com', monto: 30, medioPago: 'Paypal', fecha: '2025-09-28' },
    { id: 8, nombre: 'Pedro Sanchez', email: 'pedro@gmail.com', monto: 80, medioPago: 'Efectivo', fecha: '2025-09-29' },
    { id: 9, nombre: 'Lucía Martínez', email: 'lucia@gmail.com', monto: 120, medioPago: 'Tarjeta', fecha: '2025-09-30' },
    { id: 10, nombre: 'Jorge Ramírez', email: 'jorge@gmail.com', monto: 60, medioPago: 'Transferencia', fecha: '2025-10-01' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '', monto: '', medioPago: 'Tarjeta' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.monto || !formData.medioPago) {
      alert('Por favor completa todos los campos');
      return;
    }
    const newDonation = {
      id: donations.length + 1,
      ...formData,
      monto: parseFloat(formData.monto),
      fecha: new Date().toISOString().split('T')[0],
    };
    setDonations([...donations, newDonation]);
    setShowModal(false);
    setFormData({ nombre: '', email: '', monto: '', medioPago: 'Tarjeta' });
  };

  return (
    <>
      <AdminNavbar />
      <Container className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 style={{ color: '#2364c7', fontWeight: 'bold' }}>Donaciones Recibidas</h1>
          <Button variant="success" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle me-2"></i> Nueva Donación
          </Button>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Monto</th>
              <th>Medio de Pago</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(({ id, nombre, email, monto, medioPago, fecha }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{nombre}</td>
                <td>{email}</td>
                <td>${monto.toFixed(2)}</td>
                <td>{medioPago}</td>
                <td>{fecha}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Registrar Nueva Donación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre del donante"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Correo electrónico"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMonto">
                <Form.Label>Monto</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Cantidad donada"
                  name="monto"
                  value={formData.monto}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMedioPago">
                <Form.Label>Medio de Pago</Form.Label>
                <Form.Select
                  name="medioPago"
                  value={formData.medioPago}
                  onChange={handleChange}
                  required
                >
                  <option>Tarjeta</option>
                  <option>Transferencia</option>
                  <option>Paypal</option>
                  <option>Efectivo</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit">
                <i className="bi bi-save me-2"></i> Registrar Donación
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default DonateForm;