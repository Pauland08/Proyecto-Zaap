import React, { useState } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';

const tickets = [
  { id: 1, asunto: 'Error al subir imagen', estado: 'Abierto' },
  { id: 2, asunto: 'No se puede iniciar sesión', estado: 'Pendiente' }
];

function Support() {
  const [nuevoTicket, setNuevoTicket] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Ticket enviado:', nuevoTicket);
    setNuevoTicket('');
  };

  return (
    <Container className="mt-4">
      <h3>Soporte técnico</h3>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group>
          <Form.Label>Solicitar soporte</Form.Label>
          <Form.Control
            type="text"
            placeholder="Describe tu problema"
            value={nuevoTicket}
            onChange={(e) => setNuevoTicket(e.target.value)}
          />
        </Form.Group>
        <Button variant="danger" className="mt-2" type="submit">Enviar ticket</Button>
      </Form>

      <h5>Tickets recibidos</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Asunto</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.asunto}</td>
              <td>{t.estado}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Support;
