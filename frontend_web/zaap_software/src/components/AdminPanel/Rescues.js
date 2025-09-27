import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';

const reportes = [
  { id: 1, descripcion: 'Perro herido en el parque', estado: 'En espera' },
  { id: 2, descripcion: 'Gato abandonado en la calle 10', estado: 'Recogido' }
];

function Rescues() {
  return (
    <Container className="mt-4">
      <h3>Gestión de rescates</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.descripcion}</td>
              <td>{r.estado}</td>
              <td>
                <Button variant="info" size="sm">Actualizar estado</Button>{' '}
                <Button variant="secondary" size="sm">Reportar nuevo</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Rescues;