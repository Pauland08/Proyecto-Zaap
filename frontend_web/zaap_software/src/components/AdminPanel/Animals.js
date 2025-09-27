import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const animales = [
  {
    nombre: 'Luna',
    especie: 'Perro',
    edad: '2 años',
    estado: 'Disponible',
    ubicacion: 'Bogotá',
    imagen: 'https://via.placeholder.com/200'
  },
  {
    nombre: 'Milo',
    especie: 'Gato',
    edad: '1 año',
    estado: 'Adoptado',
    ubicacion: 'Medellín',
    imagen: 'https://via.placeholder.com/200'
  }
];

function Animals() {
  return (
    <Container className="mt-4">
      <h3>Gestión de animales</h3>
      <Row>
        {animales.map((animal, index) => (
          <Col md={4} key={index}>
            <Card className="mb-4">
              <Card.Img variant="top" src={animal.imagen} />
              <Card.Body>
                <Card.Title>{animal.nombre}</Card.Title>
                <Card.Text>
                  <strong>Especie:</strong> {animal.especie}<br />
                  <strong>Edad:</strong> {animal.edad}<br />
                  <strong>Estado:</strong> {animal.estado}<br />
                  <strong>Ubicación:</strong> {animal.ubicacion}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Animals;
