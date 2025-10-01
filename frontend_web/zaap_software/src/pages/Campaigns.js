// src/pages/Campaigns.js
import React, { useState } from 'react';
import { Button, Container, Card, Row, Col, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const allCampaigns = [
  { id: 1, tipo: 'donaciones', titulo: 'Campaña Primavera', descripcion: 'Dona y ayuda con la vacunación' },
  { id: 2, tipo: 'adopciones', titulo: 'Evento Adopción Masiva', descripcion: 'Ven y adopta un amigo fiel' },
  { id: 3, tipo: 'voluntariado', titulo: 'Voluntarios para Rescate', descripcion: 'Únete al equipo de ayuda' },
  { id: 4, tipo: 'donaciones', titulo: 'Campaña Otoño', descripcion: 'Apoya con recursos para alimentación' },
  { id: 5, tipo: 'adopciones', titulo: 'Campaña Verano', descripcion: 'Adopta en nuestras instalaciones' },
];

function Campaigns() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('todo');

  const filteredCampaigns = filter === 'todo' ? allCampaigns : allCampaigns.filter(c => c.tipo === filter);

  const handlePostular = () => {
    if (!currentUser) navigate('/login');
    else alert('Función de postulación aún no implementada');
  };

  const handleDonar = () => {
    if (!currentUser) navigate('/login');
    else alert('Función de donación aún no implementada');
  };

  const handleVerAnimales = () => {
    navigate('/animals-gallery');
  };

  const handleSerVoluntario = () => {
    if (!currentUser) navigate('/login');
    else alert('Función de voluntariado aún no implementada');
  };

  return (
    <Container fluid className="pt-5 mt-4" style={{ paddingTop: '80px' }}>
      <h1>Campañas y Eventos</h1>

      <Form.Group className="mb-4" controlId="filtroCampañas">
        <Form.Label>Filtrar por tipo:</Form.Label>
        <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="todo">Todas</option>
          <option value="donaciones">Donaciones</option>
          <option value="adopciones">Adopciones</option>
          <option value="voluntariado">Voluntariado</option>
        </Form.Select>
      </Form.Group>

      <Row>
        {filteredCampaigns.map(campaign => (
          <Col md={6} lg={4} key={campaign.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{campaign.titulo}</Card.Title>
                <Card.Text>{campaign.descripcion}</Card.Text>

                {campaign.tipo === 'donaciones' && (
                  <Button variant="primary" onClick={handleDonar}>Donar</Button>
                )}
                {campaign.tipo === 'adopciones' && (
                  <Button variant="success" onClick={handleVerAnimales}>Ver animales</Button>
                )}
                {campaign.tipo === 'voluntariado' && (
                  <Button variant="warning" onClick={handleSerVoluntario}>Ser Voluntario</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Campaigns;