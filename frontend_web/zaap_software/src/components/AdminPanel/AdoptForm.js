import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

const initialRequests = [
  { id: 1, usuario: 'Carlos Perez', mascotas: ['Canelo', 'Mia'], fechaSolicitud: '2025-09-25', estado: 'Pendiente' },
  { id: 2, usuario: 'Ana Gómez', mascotas: ['Luna'], fechaSolicitud: '2025-09-27', estado: 'Agendada', fechaCita: '2025-10-01' },
  { id: 3, usuario: 'José Martínez', mascotas: ['Rex'], fechaSolicitud: '2025-09-20', estado: 'Pendiente' },
  { id: 4, usuario: 'Laura Ruiz', mascotas: ['Nala'], fechaSolicitud: '2025-09-21', estado: 'Pendiente' },
  { id: 5, usuario: 'Miguel Torres', mascotas: ['Simba'], fechaSolicitud: '2025-09-22', estado: 'Agendada', fechaCita: '2025-10-05' },
  { id: 6, usuario: 'Sofía Díaz', mascotas: ['Luna'], fechaSolicitud: '2025-09-24', estado: 'Pendiente' },
  { id: 7, usuario: 'Eduardo Ríos', mascotas: ['Mia'], fechaSolicitud: '2025-09-23', estado: 'Pendiente' },
  { id: 8, usuario: 'Camila Soto', mascotas: ['Rex'], fechaSolicitud: '2025-09-18', estado: 'Pendiente' },
  { id: 9, usuario: 'Gabriel Acevedo', mascotas: ['Nala'], fechaSolicitud: '2025-09-19', estado: 'Agendada', fechaCita: '2025-10-10' },
  { id: 10, usuario: 'Isabel Castillo', mascotas: ['Simba'], fechaSolicitud: '2025-09-15', estado: 'Pendiente' }
];

function AdoptForm() {
  const [requests, setRequests] = useState(initialRequests);
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalDate, setShowModalDate] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [formData, setFormData] = useState({ usuario: '', mascotas: '', fechaSolicitud: '', estado: 'Pendiente' });
  const [citaDate, setCitaDate] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewSubmit = e => {
    e.preventDefault();
    if (!formData.usuario || !formData.mascotas || !formData.fechaSolicitud) {
      alert('Por favor completa todos los campos');
      return;
    }
    const newRequest = {
      id: requests.length + 1,
      usuario: formData.usuario,
      mascotas: formData.mascotas.split(',').map(m => m.trim()),
      fechaSolicitud: formData.fechaSolicitud,
      estado: formData.estado
    };
    setRequests([...requests, newRequest]);
    setShowModalNew(false);
    setFormData({ usuario: '', mascotas: '', fechaSolicitud: '', estado: 'Pendiente' });
  };

  const openDateModal = id => {
    setSelectedRequestId(id);
    setCitaDate('');
    setShowModalDate(true);
  };

  const handleDateChange = e => {
    setCitaDate(e.target.value);
  };

  const handleAgendar = () => {
    if (!citaDate) {
      alert('Por favor selecciona una fecha para la cita');
      return;
    }
    setRequests(requests.map(r => r.id === selectedRequestId ? { ...r, estado: 'Agendada', fechaCita: citaDate } : r));
    setShowModalDate(false);
  };

  const handleDarAdopcion = id => {
    setRequests(requests.map(r => r.id === id ? { ...r, estado: 'Adoptada' } : r));
  };

  return (
    <>
      <AdminNavbar />
      <Container className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 style={{ color: '#2364c7', fontWeight: 'bold' }}>Solicitudes de Adopción</h1>
          <Button variant="success" onClick={() => setShowModalNew(true)}>Crear Nueva Solicitud</Button>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Mascotas</th>
              <th>Fecha Solicitud</th>
              <th>Estado</th>
              <th>Fecha Cita</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(({ id, usuario, mascotas, fechaSolicitud, estado, fechaCita }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{usuario}</td>
                <td>{mascotas.join(', ')}</td>
                <td>{fechaSolicitud}</td>
                <td>{estado}</td>
                <td>{fechaCita || '--'}</td>
                <td>
                  {estado === 'Pendiente' && (
                    <>
                      <Button variant="info" size="sm" className="me-2" onClick={() => openDateModal(id)}>Agendar cita</Button>
                      <Button variant="success" size="sm" onClick={() => handleDarAdopcion(id)}>Dar en adopción</Button>
                    </>
                  )}
                  {(estado === 'Agendada' || estado === 'Adoptada') && <span>Sin acciones</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal para crear nueva solicitud */}
        <Modal show={showModalNew} onHide={() => setShowModalNew(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Crear Nueva Solicitud</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleNewSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del usuario</Form.Label>
                <Form.Control type="text" name="usuario" value={formData.usuario} onChange={handleChange} placeholder="Nombre completo" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mascotas solicitadas</Form.Label>
                <Form.Control type="text" name="mascotas" value={formData.mascotas} onChange={handleChange} placeholder="Nombres separados por coma" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de solicitud</Form.Label>
                <Form.Control type="date" name="fechaSolicitud" value={formData.fechaSolicitud} onChange={handleChange} />
              </Form.Group>
              <Button variant="primary" type="submit">Crear solicitud</Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Modal para agendar cita */}
        <Modal show={showModalDate} onHide={() => setShowModalDate(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Agendar Cita</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Fecha de la cita</Form.Label>
              <Form.Control type="date" value={citaDate} onChange={handleDateChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModalDate(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleAgendar}>Guardar fecha</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default AdoptForm;