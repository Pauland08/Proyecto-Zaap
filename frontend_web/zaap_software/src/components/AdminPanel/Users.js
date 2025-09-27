import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';

const usuarios = [
  { id: 1, nombre: 'Ana Torres', rol: 'Usuario' },
  { id: 2, nombre: 'Carlos Ruiz', rol: 'Administrador' }
];

function Users() {
  return (
    <Container className="mt-4">
      <h3>Gestión de usuarios</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.rol}</td>
              <td>
                <Button variant="warning" size="sm"><i className="bi bi-pencil-square"></i> Editar</Button>{' '}
                <Button variant="danger" size="sm"><i className="bi bi-trash"></i> Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Users;