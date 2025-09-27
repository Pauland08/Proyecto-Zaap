import React, { useState } from 'react';
import { Container, Form, Button, Image } from 'react-bootstrap';

function Foundation() {
  const [info, setInfo] = useState({
    nombre: 'ZAAP',
    descripcion: 'Fundación dedicada al rescate y adopción de animales en situación de calle.',
    logo: 'https://via.placeholder.com/150'
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    console.log('Información actualizada:', info);
  };

  return (
    <Container className="mt-4">
      <h3>Gestión de la fundación</h3>
      <Image src={info.logo} rounded className="mb-3" />
      {!editMode ? (
        <>
          <p><strong>Nombre:</strong> {info.nombre}</p>
          <p><strong>Descripción:</strong> {info.descripcion}</p>
          <Button variant="primary" onClick={() => setEditMode(true)}>Modificar</Button>
        </>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="nombre" value={info.nombre} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} name="descripcion" value={info.descripcion} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Logo (URL)</Form.Label>
            <Form.Control type="text" name="logo" value={info.logo} onChange={handleChange} />
          </Form.Group>
          <Button variant="success" type="submit">Guardar</Button>
        </Form>
      )}
    </Container>
  );
}

export default Foundation;
