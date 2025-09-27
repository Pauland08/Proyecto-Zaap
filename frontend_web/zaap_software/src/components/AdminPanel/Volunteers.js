import React from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';

const voluntarios = [
  { id: 1, nombre: 'Camila Ríos', tarea: 'Visita veterinaria', cita: '2 Oct 2025' },
  { id: 2, nombre: 'Esteban Mora', tarea: 'Transporte animal', cita: '5 Oct 2025' }
];

function Volunteers() {
  return (
    <Container className="mt-4">
      <h3>Gestión de voluntariado</h3>
      <Form className="mb-4">
        <Form.Group>
          <Form.Label>Postulación de nuevo voluntario</Form.Label>
          <Form.Control type="text" placeholder="Nombre completo" />
        </Form.Group>
        <Button variant="success" className="mt-2">Postular</Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tarea asignada</th>
            <th>Cita</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {voluntarios.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.nombre}</td>
              <td>{v.tarea}</td>
              <td>{v.cita}</td>
              <td>
                <Button variant="primary" size="sm">Editar</Button>{' '}
                <Button variant="danger" size="sm">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Volunteers;
