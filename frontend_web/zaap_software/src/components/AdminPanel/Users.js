// src/components/AdminPanel/Users.js
import React, { useState } from 'react';
import { Table, Button, Container, Form, Modal } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

const initialUsers = [
  { id: 1, nombre: 'Ana Torres', email: 'ana@gmail.com', rol: 'Voluntario', activo: true },
  { id: 2, nombre: 'Carlos Ruiz', email: 'carlos@gmail.com', rol: 'Donante', activo: true },
  { id: 3, nombre: 'IKIGAI', email: 'fundacion@ikigai.org', rol: 'Fundación', activo: true },
  { id: 4, nombre: 'Administrador', email: 'admin@gmail.com', rol: 'Administrador', activo: true },
  { id: 5, nombre: 'Juan Pérez', email: 'juan@gmail.com', rol: 'Ciudadano', activo: false },
];

function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const filteredUsers = users.filter(
    user =>
      user.nombre.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.rol.toLowerCase().includes(search.toLowerCase())
  );

  const isProtected = (user) => {
    if (!user) return false; // Evitar error si user es null
    return user.rol === 'Administrador' || user.rol === 'Fundación';
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleDisable = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, activo: !user.activo } : user));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleNewUser = () => {
    setEditingUser({ id: null, nombre: '', email: '', rol: 'Ciudadano', activo: true });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!editingUser.nombre || !editingUser.email || !editingUser.rol) {
      alert('Todos los campos son obligatorios');
      return;
    }
    if (!editingUser.email.endsWith('@gmail.com')) {
      alert('El email debe ser de dominio gmail.com');
      return;
    }

    if (editingUser.id) {
      setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)));
    } else {
      const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
      setUsers([...users, { ...editingUser, id: newId }]);
    }

    setShowModal(false);
    setEditingUser(null);
  };

  const handleModalChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingUser({
      ...editingUser,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <>
      <AdminNavbar />
      <Container fluid className="pt-5 mt-4">
        <h1 className="mb-4 text-primary">Gestión de usuarios</h1>

        <div className="d-flex justify-content-between mb-3">
          <Form.Control
            type="search"
            placeholder="Buscar por nombre, email o rol"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: '300px' }}
          />
          <Button variant="success" onClick={handleNewUser}>
            Nuevo Usuario
          </Button>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nombre}</td>
                  <td style={{color: '#222'}}>{user.email}</td>
                  <td>{user.rol}</td>
                  <td>{user.activo ? 'Sí' : 'No'}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(user)}
                      title="Editar"
                      disabled={isProtected(user)}
                    >
                      {/* Aquí puedes usar icono de bootstrap bi-pencil */}
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                    <Button
                      variant={user.activo ? 'outline-warning' : 'outline-success'}
                      size="sm"
                      className="me-2"
                      onClick={() => handleDisable(user.id)}
                      title={user.activo ? 'Deshabilitar' : 'Habilitar'}
                      disabled={isProtected(user)}
                    >
                      <i className="bi bi-slash-circle"></i>
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                      title="Eliminar"
                      disabled={isProtected(user)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center">No se encontraron usuarios.</td></tr>
            )}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editingUser?.id ? 'Editar Usuario' : 'Nuevo Usuario'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={editingUser?.nombre || ''}
                  onChange={handleModalChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editingUser?.email || ''}
                  onChange={handleModalChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formRol">
                <Form.Label>Rol *</Form.Label>
                <Form.Select
                  name="rol"
                  value={editingUser?.rol || 'Ciudadano'}
                  onChange={handleModalChange}
                  required
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Fundación">Fundación</option>
                  <option value="Voluntario">Voluntario</option>
                  <option value="Donante">Donante</option>
                  <option value="Ciudadano">Ciudadano</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formActivo">
                <Form.Check
                  type="checkbox"
                  label="Activo"
                  name="activo"
                  checked={editingUser?.activo || false}
                  onChange={handleModalChange}
                  disabled={isProtected(editingUser)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleSave}>Guardar</Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </>
  );
}

export default Users;