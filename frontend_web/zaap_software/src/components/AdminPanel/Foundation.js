// src/components/AdminPanel/Foundation.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Image, Button, Form, Modal } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import perro1 from '../../assets/images/perro1.jpg';

const MAP_COORDS = { lat: 4.710989, lng: -74.072092 };
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_COORDS.lat},${MAP_COORDS.lng}`;

function Foundation() {
  const [editMode, setEditMode] = useState(false);
  const [info, setInfo] = useState({
    nombre: 'IKIGAI',
    descripcion: 'Organización sin ánimo de lucro dedicada al rescate, rehabilitación y adopción responsable de animales en situación de abandono.',
    fechaFundacion: '2015',
    ubicacion: 'Bogotá D.C., Colombia',
    direccionFisica: 'Calle 123 # 45-67, Bogotá',
    telefono: '+57 312 3456 789',
    email: 'contacto@fundacion123.com',
    facebook: '/fundacion123',
    instagram: '@fundacion123',
    logo: perro1
  });

  const handleChange = (e) => setInfo({ ...info, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setEditMode(false); };

  return (
    <>
      <AdminNavbar />

      <div className="fundacion-hero">
        <h1 className="fundacion-title">Perfil de la fundación</h1>
        <div className="fundacion-subtitle">
          Edita la información de tu organización para que los usuarios puedan conocerte y realizar donaciones.
        </div>
        <Button
          variant="light"
          className="fundacion-edit-btn"
          onClick={() => setEditMode(true)}
        >
          Editar Información
        </Button>
      </div>

      <Container fluid className="fundacion-container">
        <h1 className="fundacion-section-title">Información General</h1>
        <Row className="fund-row-main gx-3">
          <Col lg={8} md={12} className="mb-3">
            <Card className="fundacion-card fundacion-card-info">
              <Card.Body>
                <Row>
                  <Col xs={12} md={4} className="d-flex justify-content-center align-items-start mb-3 mb-md-0">
                    <Image src={info.logo} alt="Logo Fundación" fluid className="fundacion-logo-img"/>
                  </Col>
                  <Col xs={12} md={8}>
                    <h2 className="fundacion-card-title">Nombre de la Fundación</h2>
                    <p><strong>Descripción:</strong> {info.descripcion}</p>
                    <p><strong>Año de Fundación:</strong> {info.fechaFundacion}</p>
                    <p><strong>Ubicación:</strong> {info.ubicacion}</p>
                    <p><strong>Dirección física:</strong> {info.direccionFisica}</p>
                    <p><strong>Teléfono de contacto:</strong> {info.telefono}</p>
                    <p><strong>Correo electrónico:</strong> {info.email}</p>
                    <p><strong>Redes sociales:</strong><br />
                      Facebook: {info.facebook}<br />
                      Instagram: {info.instagram}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={12}>
            <Card className="fundacion-card fundacion-card-mapa">
              <Card.Body>
                <div className="fundacion-mapa-title">Ubicación en el mapa</div>
                <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
                  <iframe
                    title="Ubicación Fundación"
                    width="100%"
                    height="245"
                    frameBorder="0"
                    className="fundacion-map-iframe"
                    src={`https://maps.google.com/maps?q=${MAP_COORDS.lat},${MAP_COORDS.lng}&hl=es&z=16&output=embed`}
                    allowFullScreen
                  />
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modal de edición */}
        <Modal show={editMode} onHide={() => setEditMode(false)} centered size="lg">
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Información de la Fundación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" value={info.nombre} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="descripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows={3} name="descripcion" value={info.descripcion} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="fechaFundacion">
                    <Form.Label>Año de Fundación</Form.Label>
                    <Form.Control type="text" name="fechaFundacion" value={info.fechaFundacion} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="ubicacion">
                    <Form.Label>Ubicación</Form.Label>
                    <Form.Control type="text" name="ubicacion" value={info.ubicacion} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="direccionFisica">
                    <Form.Label>Dirección física</Form.Label>
                    <Form.Control type="text" name="direccionFisica" value={info.direccionFisica} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="telefono">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="tel" name="telefono" value={info.telefono} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={info.email} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="logo">
                    <Form.Label>Logo</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setInfo((prev) => ({ ...prev, logo: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div className="mt-3 mb-3">
                      <Image src={info.logo} alt="Logo Preview" fluid className="fundacion-logo-img" />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="facebook">
                    <Form.Label>Facebook</Form.Label>
                    <Form.Control type="text" name="facebook" value={info.facebook} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="instagram">
                    <Form.Label>Instagram</Form.Label>
                    <Form.Control type="text" name="instagram" value={info.instagram} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit">Guardar</Button>
              <Button variant="secondary" onClick={() => setEditMode(false)}>Cancelar</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </>
  );
}

export default Foundation;
