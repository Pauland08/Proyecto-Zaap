import React, { useState } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

const tareasPosibles = [
  'Visita veterinaria',
  'Transporte animal',
  'Limpieza de refugio',
  'Educación comunitaria',
  'Captura y rescate',
];

const citasPosibles = [
  '2 Oct 2025',
  '5 Oct 2025',
  '10 Oct 2025',
  '15 Oct 2025',
  '20 Oct 2025',
];

function Volunteers() {
  const [voluntarios, setVoluntarios] = useState([
    { id: 1, nombre: 'Camila Ríos', edad: 28, tarea: 'Visita veterinaria', cita: '2 Oct 2025', activo: true },
    { id: 2, nombre: 'Esteban Mora', edad: 35, tarea: 'Transporte animal', cita: '5 Oct 2025', activo: true },
    { id: 3, nombre: 'Laura Gómez', edad: 30, tarea: 'Limpieza de refugio', cita: '10 Oct 2025', activo: true },
    { id: 4, nombre: 'Miguel Suárez', edad: 40, tarea: 'Educación comunitaria', cita: '15 Oct 2025', activo: true },
    { id: 5, nombre: 'Sofía Reyes', edad: 26, tarea: 'Captura y rescate', cita: '20 Oct 2025', activo: true }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: null, nombre: '', edad: '', tarea: '', cita: '' });

  const openModal = (voluntario = null) => {
    if (voluntario) {
      setForm({ ...voluntario });
    } else {
      setForm({ id: null, nombre: '', edad: '', tarea: '', cita: '' });
    }
    setShowModal(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!form.nombre || !form.edad || !form.tarea) {
      alert('Completa todos los campos');
      return;
    }
    // Asigna cita aleatoria si no hay
    if (!form.cita) {
      const randomCita = citasPosibles[Math.floor(Math.random() * citasPosibles.length)];
      form.cita = randomCita;
    }

    if (form.id) {
      // Editar
      setVoluntarios(voluntarios.map(v => (v.id === form.id ? { ...form } : v)));
    } else {
      // Nuevo
      setVoluntarios([...voluntarios, { ...form, id: voluntarios.length + 1, activo: true }]);
    }
    setShowModal(false);
  };

  const handleDelete = id => {
    if (window.confirm('¿Eliminar voluntario?')) {
      setVoluntarios(voluntarios.filter(v => v.id !== id));
    }
  };

  const toggleActivo = id => {
    setVoluntarios(voluntarios.map(v => (v.id === id ? { ...v, activo: !v.activo } : v)));
  };

  return (
    <>
      <AdminNavbar />
      <Container className="mt-4">
        <h1>Gestión de voluntariado</h1>
        <Button variant="success" className="mb-3" onClick={() => openModal()}>
          <i className="bi bi-plus-circle me-2"></i> Postular nuevo voluntario
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Tarea asignada</th>
              <th>Cita</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {voluntarios.map(v => (
              <tr key={v.id} className={v.activo ? '' : 'text-muted'}>
                <td>{v.id}</td>
                <td>{v.nombre}</td>
                <td>{v.edad}</td>
                <td>{v.tarea}</td>
                <td>{v.cita}</td>
                <td>{v.activo ? 'Sí' : 'No'}</td>
                <td>
                  <Button variant="info" size="sm" className="me-2" onClick={() => openModal(v)}>
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button variant={v.activo ? "warning" : "success"} size="sm" className="me-2" onClick={() => toggleActivo(v.id)}>
                    {v.activo ? <i className="bi bi-slash-circle"></i> : <i className="bi bi-check-circle"></i>}
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(v.id)}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{form.id ? 'Editar voluntario' : 'Postular nuevo voluntario'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control type="text" name="nombre" value={form.nombre} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Edad</Form.Label>
                <Form.Control type="number" name="edad" value={form.edad} onChange={handleChange} min="1" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tarea asignada</Form.Label>
                <Form.Select name="tarea" value={form.tarea} onChange={handleChange}>
                  <option value="">Seleccione una tarea</option>
                  {tareasPosibles.map(tarea => (
                    <option key={tarea} value={tarea}>{tarea}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cita (opcional)</Form.Label>
                <Form.Control type="text" name="cita" value={form.cita} onChange={handleChange} placeholder="Ejemplo: 5 Oct 2025" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              <i className="bi bi-save me-2"></i> Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Volunteers;