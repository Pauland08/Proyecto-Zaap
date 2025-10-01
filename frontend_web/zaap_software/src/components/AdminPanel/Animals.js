import React, { useState } from "react";
import { Container, Table, Button, Modal, Form, Image } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";

import perro1 from "../../assets/images/perro1.jpg";
import perro2 from "../../assets/images/perro2.jpg";
import perro3 from "../../assets/images/perro3.jpg";
import gato1 from "../../assets/images/gato1.jpg";
import gato2 from "../../assets/images/gato2.jpg";
import gato3 from "../../assets/images/gato3.jpg";

const initialAnimals = [
  { id: 1, nombre: "Canelo", descripcion: "Perro amigable y juguetón", estado: "Disponible", imagen: perro1 },
  { id: 2, nombre: "Luna", descripcion: "Le gusta pasear y es muy activo", estado: "Adoptado", imagen: perro2 },
  { id: 3, nombre: "Rex", descripcion: "Perro en tratamiento por heridas leves", estado: "En tratamiento", imagen: perro3 },
  { id: 4, nombre: "Mia", descripcion: "Gata tranquila y cariñosa", estado: "Disponible", imagen: gato1 },
  { id: 5, nombre: "Nala", descripcion: "Juguetona y curiosa", estado: "Adoptado", imagen: gato2 },
  { id: 6, nombre: "Simba", descripcion: "Le gusta dormir y es muy sociable", estado: "En tratamiento", imagen: gato3 },
];

function Animals() {
  const [animals, setAnimals] = useState(initialAnimals);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    estado: "Disponible",
    imagen: null,
  });
  const [editData, setEditData] = useState({
    id: null,
    estado: "Disponible",
  });

  const openModal = (animal = null) => {
    if (animal) {
      setEditData({ id: animal.id, estado: animal.estado });
      setShowEditModal(true);
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        estado: "Disponible",
        imagen: null,
      });
      setShowModal(true);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen" && files && files.length > 0) {
      setFormData((prev) => ({ ...prev, imagen: URL.createObjectURL(files[0]) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    if (!formData.nombre || !formData.descripcion || !formData.estado || !formData.imagen) {
      setAlertVisible(true);
      return;
    }
    setAlertVisible(false);
    const newAnimal = {
      id: animals.length + 1,
      ...formData,
    };
    setAnimals([...animals, newAnimal]);
    setShowModal(false);
  };

  const handleEditChange = (e) => {
    setEditData((prev) => ({ ...prev, estado: e.target.value }));
  };

  const handleEditSave = () => {
    setAnimals(animals.map((a) => (a.id === editData.id ? { ...a, estado: editData.estado } : a)));
    setShowEditModal(false);
  };

  const handleDelete = (animal) => {
    if (animal.estado === "Disponible") {
      alert("No se puede eliminar un animal disponible.");
      return;
    }
    if (window.confirm(`¿Eliminar a ${animal.nombre}?`)) {
      setAnimals(animals.filter((a) => a.id !== animal.id));
    }
  };

  return (
    <>
      <AdminNavbar />
      <Container className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 style={{ color: "#2364c7", fontWeight: "bold" }}>Panel de Animales</h1>
          <Button variant="success" onClick={() => openModal()}>
            <i className="bi bi-plus-circle me-2" />
            Agregar nuevo
          </Button>
        </div>
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.id}>
                <td>
                  <Image src={animal.imagen} alt={animal.nombre} rounded style={{ width: "120px", height: "auto" }} />
                </td>
                <td>{animal.nombre}</td>
                <td>{animal.descripcion}</td>
                <td>{animal.estado}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => openModal(animal)}
                    title="Editar estado"
                  >
                    <i className="bi bi-pencil-square" />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(animal)} title="Eliminar">
                    <i className="bi bi-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal agregar */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Nuevo Animal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alertVisible && (
              <div className="alert alert-danger" role="alert">
                Por favor llena todos los campos.
              </div>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} name="descripcion" value={formData.descripcion} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select name="estado" value={formData.estado} onChange={handleChange}>
                <option>Disponible</option>
                <option>Adoptado</option>
                <option>En tratamiento</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" name="imagen" accept="image/*" onChange={handleChange} />
              {formData.imagen && <Image src={formData.imagen} alt="Preview" thumbnail className="mt-2" style={{ width: "120px", height: "auto" }} />}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal editar estado */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Editar Estado del Animal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Select value={editData.estado} onChange={handleEditChange}>
                <option>Disponible</option>
                <option>Adoptado</option>
                <option>En tratamiento</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleEditSave}>
              Guardar cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Animals;