import React from 'react';
import { Button, Container } from 'react-bootstrap';
import AdoptionCarousel from './Carousel';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Container className="mt-4">
      <h2>Bienvenido a ZAAP</h2>
      <p>Nuestra misión es rescatar, proteger y encontrar hogares para animales en situación de calle.</p>
      
      <AdoptionCarousel />

      <div className="mt-4 d-flex gap-3">
        <Button variant="success" className="custom-btn" onClick={() => navigate('/adopta')}><i className="bi bi-heart-fill"></i> Adopta</Button>
        <Button variant="warning" className="custom-btn" onClick={() => navigate('/dona')}><i className="bi bi-cash-coin"></i> Dona</Button>
        <Button variant="info" className="custom-btn" onClick={() => navigate('/reportar')}><i className="bi bi-exclamation-circle"></i> Reportar animal</Button>
      </div>
    </Container>
  );
}

export default Home;