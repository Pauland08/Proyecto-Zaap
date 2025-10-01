// src/components/Public/Home.js
import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import perro1 from '../../assets/images/perro1.jpg';
import perro2 from '../../assets/images/perro2.jpg';
import perro3 from '../../assets/images/perro3.jpg';
import gato1 from '../../assets/images/gato1.jpg';
import gato2 from '../../assets/images/gato2.jpg';
import gato3 from '../../assets/images/gato3.jpg';

function Home() {
  const { usuario } = useAuth();

  const heroImages = [
    { src: perro1, alt: 'Perro rescatado 1' },
    { src: perro2, alt: 'Perro rescatado 2' },
    { src: perro3, alt: 'Perro rescatado 3' },
    { src: gato1, alt: 'Gato rescatado 1' },
    { src: gato2, alt: 'Gato rescatado 2' },
    { src: gato3, alt: 'Gato rescatado 3' },
  ];

  return (
    <div className="home-wrapper" style={{ paddingTop: '70px' }}>
      <section className="hero-section py-5">
        <Container fluid className="px-0">
          <Row className="align-items-center">
            <Col md={6} className="hero-text px-4">
              <h1><strong>Bienvenido a ZAAP</strong></h1>
              <p>
                Somos una red que conecta a la fundación IKIGAI, voluntarios y personas solidarias
                para rescatar, proteger y dar un nuevo hogar a los animales que lo necesitan.
              </p>
              <h2>¿Encontraste un animal que necesita ayuda?</h2>
              <p>
                Reporta el caso para que nuestra fundación pueda actuar de inmediato. Solo necesitas
                llenar un breve formulario.
              </p>
              <div className="cta-buttons">
                <Button as={Link} to="/report-animal" variant="danger" size="lg">
                  <i className="bi bi-exclamation-circle"></i> Reportar Rescate
                </Button>
              </div>
            </Col>
            <Col md={6}>
              <Carousel interval={3000} className="hero-carousel shadow rounded">
                {heroImages.map((img, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100 hero-img"
                      src={img.src}
                      alt={img.alt}
                      style={{height: '400px', objectFit: 'cover'}}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Tarjetas de acción */}
      <section className="action-cards py-5 bg-light">
        <Container fluid className="action-cards">
  <Row className="gx-3 gy-4 justify-content-center">
    <Col xs={12} sm={6} md={4} lg={4}>
      <Card className="action-card text-center">
        <Card.Body>
          <Card.Title><i className="bi bi-heart-fill"></i> Adopta</Card.Title>
          <Card.Text>Encuentra tu compañero ideal y dale una segunda oportunidad.</Card.Text>
          <Button as={Link} to="/animals-gallery" variant="primary">
            Ver animales
          </Button>
        </Card.Body>
      </Card>
    </Col>
    <Col xs={12} sm={6} md={4} lg={4}>
      <Card className="action-card text-center">
        <Card.Body>
          <Card.Title><i className="bi bi-cash-coin"></i> Donaciones</Card.Title>
          <Card.Text>Apoya nuestras campañas activas y ayuda a más animales.</Card.Text>
          <Button as={Link} to="/campaigns" variant="outline-primary">
            Ver campañas
          </Button>
        </Card.Body>
      </Card>
    </Col>
    <Col xs={12} sm={6} md={4} lg={4}>
      <Card className="action-card text-center">
        <Card.Body>
          <Card.Title><i className="bi bi-people-fill"></i> Voluntariado</Card.Title>
          <Card.Text>Únete a nuestra red solidaria y marca la diferencia.</Card.Text>
          <Button as={Link} to="/register" variant="success">
            Registrarme
          </Button>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
      </section>

      {/* Sección adicional */}
      <section className="py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h2>Nuestro Impacto</h2>
              <p className="lead">Juntos hemos logrado rescatar y dar hogar a cientos de animales</p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={3} className="text-center">
              <h3 className="text-primary">130+</h3>
              <p>Animales rescatados</p>
            </Col>
            <Col md={3} className="text-center">
              <h3 className="text-success">100+</h3>
              <p>Adopciones exitosas</p>
            </Col>
            <Col md={3} className="text-center">
              <h3 className="text-info">80+</h3>
              <p>Voluntarios activos</p>
            </Col>
            <Col md={3} className="text-center">
              <h3 className="text-warning">25+</h3>
              <p>Campañas realizadas</p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;