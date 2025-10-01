import React, { useState } from 'react';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from './AdminNavbar';

function AdminCampaigns() {
  const { currentUser } = useAuth();

  const [campaigns, setCampaigns] = useState([
    { id: 1, nombre: 'Campaña de adopción primavera', descripcion: 'Promoción especial de adopción en primavera', estado: 'Activa' },
    { id: 2, nombre: 'Evento de voluntariado para limpieza', descripcion: 'Convocatoria para voluntarios en limpieza de parque', estado: 'Deshabilitada' },
    { id: 3, nombre: 'Campaña de vacunación', descripcion: 'Vacunación gratuita para mascotas', estado: 'Activa' },
    { id: 4, nombre: 'Evento de concientización', descripcion: 'Charlas y talleres sobre cuidado animal', estado: 'Activa' },
    { id: 5, nombre: 'Campaña de donación de alimentos', descripcion: 'Recopilación de alimentos para refugios', estado: 'Deshabilitada' },
    { id: 6, nombre: 'Campaña de esterilización', descripcion: 'Esterilización accesible para mascotas', estado: 'Activa' },
    { id: 7, nombre: 'Evento familiar', descripcion: 'Día de juegos y adopciones', estado: 'Activa' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', estado: 'Activa' });

  if (!currentUser) {
    return (
      <Container className="mt-5">
        <p>Debes iniciar sesión para acceder al panel de administración de campañas y eventos.</p>
      </Container>
    );
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.nombre || !formData.descripcion) {
      alert('Completa todos los campos');
      return;
    }
    setCampaigns([...campaigns, { id: campaigns.length + 1, ...formData }]);
    setShowModal(false);
    setFormData({ nombre: '', descripcion: '', estado: 'Activa' });
  };

  const handleDisable = id => {
    setCampaigns(campaigns.map(c => (c.id === id ? { ...c, estado: 'Deshabilitada' } : c)));
  };

  const handleDelete = id => {
    if (window.confirm('¿Seguro quieres eliminar este evento?')) {
      setCampaigns(campaigns.filter(c => c.id !== id));
    }
  };

  return (
    <>
      <AdminNavbar />
      <Container className="mt-5">
        <h1 style={{ color: '#2364c7', fontWeight: 'bold' }}>Campañas y Eventos</h1>

        <Button className="my-3" variant="success" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-circle me-2"></i> Crear Nueva Campaña/Evento
        </Button>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(({ id, nombre, descripcion, estado }) => (
              <tr key={id} className={estado === 'Deshabilitada' ? 'text-muted' : ''}>
                <td>{nombre}</td>
                <td>{descripcion}</td>
                <td>{estado}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => {
                    setFormData({ nombre, descripcion, estado });
                    setShowModal(true);
                  }}>
                    <i className="bi bi-pencil-square me-1"></i> Editar
                  </Button>
                  {estado !== 'Deshabilitada' && (
                    <Button variant="secondary" size="sm" className="me-2" onClick={() => handleDisable(id)}>
                      <i className="bi bi-slash-circle me-1"></i> Deshabilitar
                    </Button>
                  )}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(id)}>
                    <i className="bi bi-trash me-1"></i> Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Crear o Editar Campaña/Evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre de la campaña o evento"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Descripción detallada"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option>Activa</option>
                <option>Deshabilitada</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              <i className="bi bi-save me-1"></i> Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default AdminCampaigns;