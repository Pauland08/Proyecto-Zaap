import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const campaigns = [
  {
    titulo: 'Campaña de vacunación',
    descripcion: 'Vacunación gratuita para animales rescatados.',
    categoria: 'Salud',
    meta: '$1.000.000',
    fecha: 'Octubre 2025',
    estado: 'Activa'
  },
  {
    titulo: 'Evento de adopción',
    descripcion: 'Jornada de adopción en el parque central.',
    categoria: 'Adopción',
    meta: 'N/A',
    fecha: '15 Noviembre 2025',
    estado: 'Programado'
  }
];

function Campaigns() {
  return (
    <Container className="mt-4">
      <h3>Campañas y eventos</h3>
      <Row>
        {campaigns.map((campaña, index) => (
          <Col md={6} key={index}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{campaña.titulo}</Card.Title>
                <Card.Text>{campaña.descripcion}</Card.Text>
                <p><strong>Categoría:</strong> {campaña.categoria}</p>
                <p><strong>Meta:</strong> {campaña.meta}</p>
                <p><strong>Fecha:</strong> {campaña.fecha}</p>
                <p><strong>Estado:</strong> {campaña.estado}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Campaigns;
