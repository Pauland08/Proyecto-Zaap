import React, { useState } from 'react';
import { Table, Button, Container, Row, Col, Card, Modal, Form, Alert } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

const initialReportes = [
  { id: 1, descripcion: 'Perro herido en el parque', estado: 'En espera', ubicacion: 'Parque Central' },
  { id: 2, descripcion: 'Gato abandonado en la calle 10', estado: 'Recogido', ubicacion: 'Calle 10' },
  { id: 3, descripcion: 'Perro callejero con heridas', estado: 'En espera', ubicacion: 'Sector Norte' },
  { id: 4, descripcion: 'Gato rescatado del abandono', estado: 'Recogido', ubicacion: 'Barrio La Paz' },
  { id: 5, descripcion: 'Perro atrapado en canal', estado: 'En espera', ubicacion: 'Canal Principal' },
  { id: 6, descripcion: 'Gato herido en jardín', estado: 'Adoptado', ubicacion: 'Jardín Botánico' }
];

function Rescues() {
  const [reportes, setReportes] = useState(initialReportes);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [formData, setFormData] = useState({ descripcion: '', ubicacion: '', imagen: null });
  const [editData, setEditData] = useState({ id: null, estado: 'En espera' });

  const pendientes = reportes.filter(r => r.estado === 'En espera');
  const rescatados = reportes.filter(r => r.estado === 'Recogido');
  const adoptados = reportes.filter(r => r.estado === 'Adoptado');

  const handleNewChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleNewSubmit = () => {
    if (!formData.descripcion || !formData.ubicacion || !formData.imagen) {
      setAlertVisible(true);
      return;
    }
    setAlertVisible(false);
    const newReporte = {
      id: reportes.length + 1,
      descripcion: formData.descripcion,
      ubicacion: formData.ubicacion,
      estado: 'En espera',
      imagen: formData.imagen
    };
    setReportes([...reportes, newReporte]);
    setShowNewModal(false);
    setFormData({ descripcion: '', ubicacion: '', imagen: null });
  };

  const openEditModal = reporte => {
    setEditData({ id: reporte.id, estado: reporte.estado });
    setShowEditModal(true);
  };

  const handleEditChange = e => {
    setEditData(prev => ({ ...prev, estado: e.target.value }));
  };

  const handleEditSubmit = () => {
    setReportes(reportes.map(r => (r.id === editData.id ? { ...r, estado: editData.estado } : r)));
    setShowEditModal(false);
  };

  return (
    <>
      <AdminNavbar />
      <Container className="mt-5">
        <h1 style={{ color: '#2364c7', fontWeight: 'bold', marginBottom: '1rem' }}>
          Gestión de rescates
        </h1>

        <Row className="g-4">
          <Col md={6}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <strong>Rescates Pendientes</strong>
                <Button variant="success" size="sm" onClick={() => setShowNewModal(true)}>
                  <i className="bi bi-plus-circle me-1" /> Reportar nuevo
                </Button>
              </Card.Header>
              <Card.Body>
                {pendientes.length === 0 ? (
                  <p>No hay rescates pendientes.</p>
                ) : (
                  <Table striped bordered hover responsive size="sm">
                    <thead>
                      <tr className="table-light">
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Ubicación</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendientes.map(r => (
                        <tr key={r.id}>
                          <td>{r.id}</td>
                          <td>{r.descripcion}</td>
                          <td>{r.estado}</td>
                          <td>{r.ubicacion}</td>
                          <td>
                            <Button variant="primary" size="sm" onClick={() => openEditModal(r)}>
                              <i className="bi bi-pencil-square me-1" /> Modificar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <strong>Rescates Rescatados y Adoptados</strong>
                <Button variant="success" size="sm" onClick={() => setShowNewModal(true)}>
                  <i className="bi bi-plus-circle me-1" /> Reportar nuevo
                </Button>
              </Card.Header>
              <Card.Body>
                {(rescatados.length + adoptados.length) === 0 ? (
                  <p>No hay rescates rescatados o adoptados.</p>
                ) : (
                  <Table striped bordered hover responsive size="sm">
                    <thead>
                      <tr className="table-light">
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Ubicación</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...rescatados, ...adoptados].map(r => (
                        <tr key={r.id}>
                          <td>{r.id}</td>
                          <td>{r.descripcion}</td>
                          <td>{r.estado}</td>
                          <td>{r.ubicacion}</td>
                          <td>
                            <Button variant="primary" size="sm" onClick={() => openEditModal(r)}>
                              <i className="bi bi-pencil-square me-1" /> Modificar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <h3 style={{ color: '#2364c7', fontWeight: 'bold', marginTop: '2rem' }}>
          Reporte de Rescatados y Adoptados
        </h3>
        <Card className="p-3" style={{ maxWidth: '450px' }}>
          <p>Total rescates rescatados: {rescatados.length}</p>
          <p>Total rescates adoptados: {adoptados.length}</p>
          <p>Total general: {rescatados.length + adoptados.length}</p>
        </Card>

        {/* Modal Reportar Nuevo */}
        <Modal show={showNewModal} onHide={() => setShowNewModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Reportar Nuevo Rescate</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alertVisible && (
              <Alert variant="danger" onClose={() => setAlertVisible(false)} dismissible>
                Favor completa todos los campos.
              </Alert>
            )}
            <Form.Group className="mb-3" controlId="descripcionNew">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleNewChange}
                placeholder="Descripción del rescate"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ubicacionNew">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleNewChange}
                placeholder="Lugar donde viste al animal"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imagenNew">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleNewChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowNewModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleNewSubmit}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal Modificar Estado */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Modificar Estado del Rescate</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="estadoEdit">
              <Form.Label>Estado</Form.Label>
              <Form.Select value={editData.estado} onChange={handleEditChange}>
                {editData.estado === 'En espera' && <>
                  <option value="En espera">En espera</option>
                  <option value="Recogido">Recogido</option>
                </>}
                {editData.estado === 'Recogido' && <>
                  <option value="Recogido">Recogido</option>
                  <option value="Adoptado">Adoptado</option>
                </>}
                {editData.estado === 'Adoptado' && <option value="Adoptado">Adoptado</option>}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleEditSubmit}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Rescues;