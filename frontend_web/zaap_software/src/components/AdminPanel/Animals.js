import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Image, InputGroup } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";

// Importar imágenes locales
import tambo from "../../assets/images/tambo_perro.jpg";
import luna from "../../assets/images/luna_gato.jpg";
import toby from "../../assets/images/toby_perro.jpg";
import frida from "../../assets/images/frida_perro.jpg";
import michi from "../../assets/images/michi_techo.jpg";
import rocky from "../../assets/images/rocky_cachorro.jpg";

// Mapa de imágenes locales
const imageMap = {
  "tambo_perro.jpg": tambo,
  "luna_gato.jpg": luna,
  "toby_perro.jpg": toby,
  "frida_perro.jpg": frida,
  "michi_techo.jpg": michi,
  "rocky_cachorro.jpg": rocky,
};

function Animals() {
  const [animals, setAnimals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [searchId, setSearchId] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    especie: "Perro",
    edad_aprox: "",
    estado_medico: "",
    descripcion: "",
    ubicacion: "",
    estado: "disponible",
    fotos: "",
  });

  const [editData, setEditData] = useState({
    id_animal: null,
    nombre: "",
    especie: "Perro",
    edad_aprox: "",
    estado_medico: "",
    descripcion: "",
    ubicacion: "",
    estado: "disponible",
    fotos: "",
  });

  const token = localStorage.getItem("token");

  /* =========================
     CONSULTAR ANIMALES
  ========================= */
  const fetchAnimals = async () => {
    try {
      const res = await fetch("http://localhost:5000/animals/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAnimals(data);
    } catch (error) {
      console.error(error);
      alert("Error al consultar animales");
    }
  };

  /* =========================
     CONSULTAR ANIMAL POR ID
  ========================= */
  const fetchAnimalById = async () => {
    if (!searchId) return fetchAnimals();
    try {
      const res = await fetch(`http://localhost:5000/animals/${searchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        alert("Animal no encontrado");
        return;
      }
      const data = await res.json();
      setAnimals([data]);
    } catch (error) {
      console.error(error);
      alert("Error al buscar animal");
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  /* =========================
     MANEJO DE MODALES
  ========================= */
  const openModal = () => {
    setFormData({
      nombre: "",
      especie: "Perro",
      edad_aprox: "",
      estado_medico: "",
      descripcion: "",
      ubicacion: "",
      estado: "disponible",
      fotos: "",
    });
    setAlertVisible(false);
    setShowModal(true);
  };

  const openEditModal = (animal) => {
    setEditData({
      id_animal: animal.id_animal,
      nombre: animal.nombre,
      especie: animal.especie,
      edad_aprox: animal.edad_aprox || "",
      estado_medico: animal.estado_medico || "",
      descripcion: animal.descripcion,
      ubicacion: animal.ubicacion || "",
      estado: animal.estado,
      fotos: animal.fotos,
    });
    setShowEditModal(true);
  };

  /* =========================
     CREAR ANIMAL
  ========================= */
  const handleSave = async () => {
    if (!formData.nombre || !formData.descripcion || !formData.fotos) {
      setAlertVisible(true);
      return;
    }
    setAlertVisible(false);

    try {
      const res = await fetch("http://localhost:5000/animals/createAnimal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al crear animal");

      setShowModal(false);
      fetchAnimals();
    } catch (error) {
      console.error(error);
      alert("Error al crear animal");
    }
  };

  /* =========================
     EDITAR ANIMAL
  ========================= */
  const handleEditSave = async () => {
    if (!editData.nombre || !editData.descripcion || !editData.fotos) {
      alert("Por favor llena todos los campos");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/animals/updateAnimal/${editData.id_animal}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error("Error al actualizar animal");

      setShowEditModal(false);
      fetchAnimals();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar animal");
    }
  };

  /* =========================
     ELIMINAR ANIMAL
  ========================= */
  const handleDelete = async (animal) => {
    if (animal.estado === "disponible") {
      alert("No se puede eliminar un animal disponible");
      return;
    }
    if (!window.confirm(`¿Eliminar a ${animal.nombre}?`)) return;

    try {
      await fetch(`http://localhost:5000/animals/deleteAnimal/${animal.id_animal}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAnimals();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar animal");
    }
  };

  /* ========================= RENDER ========================= */
  return (
    <>
      <AdminNavbar />
      <Container className="mt-4">
        <div className="d-flex justify-content-between mb-3">
          <h1 style={{ color: "#2364c7", fontWeight: "bold" }}>Panel de Animales</h1>
          <Button variant="success" onClick={openModal}>Agregar Animal</Button>
        </div>

        {/* BUSCADOR POR ID */}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Buscar animal por ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button variant="primary" onClick={fetchAnimalById}>Consultar</Button>
        </InputGroup>

        {/* GRID ESTILO TARJETAS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {animals.map((animal) => (
            <div
              key={animal.id_animal}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                backgroundColor: "#fff",
              }}
            >
              {animal.fotos && imageMap[animal.fotos] && (
                <Image
                  src={imageMap[animal.fotos]}
                  alt={animal.nombre}
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
              )}
              <div style={{ padding: "12px" }}>
                <h5>{animal.nombre}</h5>
                <small className="text-muted">{animal.especie}</small>
                <p style={{ fontSize: "0.9rem" }}>{animal.descripcion}</p>
                <p><strong>Edad:</strong> {animal.edad_aprox}</p>
                <p><strong>Estado médico:</strong> {animal.estado_medico}</p>
                <p><strong>Ubicación:</strong> {animal.ubicacion}</p>
                <p><strong>Estado:</strong> {animal.estado}</p>
                <div className="d-flex justify-content-between mt-2">
                  <Button variant="info" size="sm" onClick={() => openEditModal(animal)}>Editar</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(animal)}>Eliminar</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL CREAR */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Animal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alertVisible && <div className="alert alert-danger">Por favor llena todos los campos requeridos</div>}
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Especie</Form.Label>
              <Form.Select name="especie" value={formData.especie} onChange={(e) => setFormData({ ...formData, especie: e.target.value })}>
                <option>Perro</option>
                <option>Gato</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Edad aproximada</Form.Label>
              <Form.Control name="edad_aprox" value={formData.edad_aprox} onChange={(e) => setFormData({ ...formData, edad_aprox: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Estado médico</Form.Label>
              <Form.Control name="estado_medico" value={formData.estado_medico} onChange={(e) => setFormData({ ...formData, estado_medico: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} name="descripcion" value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control name="ubicacion" value={formData.ubicacion} onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Estado</Form.Label>
              <Form.Select name="estado" value={formData.estado} onChange={(e) => setFormData({ ...formData, estado: e.target.value })}>
                <option>disponible</option>
                <option>adoptado</option>
                <option>en_tratamiento</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Imagen (nombre de archivo)</Form.Label>
              <Form.Select name="fotos" value={formData.fotos} onChange={(e) => setFormData({ ...formData, fotos: e.target.value })}>
                <option value="">Selecciona una imagen</option>
                {Object.keys(imageMap).map((key) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </Form.Select>
              {formData.fotos && <Image src={imageMap[formData.fotos]} alt="Preview" thumbnail className="mt-2" style={{ width: "100px", height: "auto" }} />}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleSave}>Guardar</Button>
          </Modal.Footer>
        </Modal>

        {/* MODAL EDITAR */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Editar Animal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={editData.nombre} onChange={(e) => setEditData({ ...editData, nombre: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Especie</Form.Label>
              <Form.Select name="especie" value={editData.especie} onChange={(e) => setEditData({ ...editData, especie: e.target.value })}>
                <option>Perro</option>
                <option>Gato</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Edad aproximada</Form.Label>
              <Form.Control name="edad_aprox" value={editData.edad_aprox} onChange={(e) => setEditData({ ...editData, edad_aprox: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Estado médico</Form.Label>
              <Form.Control name="estado_medico" value={editData.estado_medico} onChange={(e) => setEditData({ ...editData, estado_medico: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} name="descripcion" value={editData.descripcion} onChange={(e) => setEditData({ ...editData, descripcion: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control name="ubicacion" value={editData.ubicacion} onChange={(e) => setEditData({ ...editData, ubicacion: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Estado</Form.Label>
              <Form.Select name="estado" value={editData.estado} onChange={(e) => setEditData({ ...editData, estado: e.target.value })}>
                <option>disponible</option>
                <option>adoptado</option>
                <option>en_tratamiento</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Imagen (nombre de archivo)</Form.Label>
              <Form.Select name="fotos" value={editData.fotos} onChange={(e) => setEditData({ ...editData, fotos: e.target.value })}>
                <option value="">Selecciona una imagen</option>
                {Object.keys(imageMap).map((key) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </Form.Select>
              {editData.fotos && imageMap[editData.fotos] && <Image src={imageMap[editData.fotos]} alt="Preview" thumbnail className="mt-2" style={{ width: "100px", height: "auto" }} />}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleEditSave}>Guardar cambios</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Animals;