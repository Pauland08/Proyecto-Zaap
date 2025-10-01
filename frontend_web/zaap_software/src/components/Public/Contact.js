// src/components/Public/About.js
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import perro1 from '../../assets/images/perro1.jpg';
import gato1 from '../../assets/images/gato1.jpg';

function About() {
  return (
    <>
      <Container className="pt-5 mt-4">
        <h1>Sobre Nosotros</h1>
        <p>
          Somos la fundación IKIGAI, dedicada a rescatar, proteger y brindar un nuevo hogar a los animales que lo necesitan.
          Nuestra misión es generar conciencia y promover la adopción responsable en la comunidad.
        </p>
        <Row className="my-4 align-items-center">
          <Col md={6}>
            <Image src={perro1} rounded fluid alt="Perro feliz" />
          </Col>
          <Col md={6}>
            <Image src={gato1} rounded fluid alt="Gato feliz" />
          </Col>
        </Row>
      </Container>

      <footer className="bg-light py-4 mt-5 border-top">
        <Container>
          <Row>
            <Col md={4} className="text-center">
              <h3 className="text-primary"><strong>150+</strong></h3>
              <p><strong>Animales Rescatados</strong></p>
            </Col>
            <Col md={4} className="text-center">
              <h3 className="text-success"><strong>120+</strong></h3>
              <p><strong>Adopciones Exitosas</strong></p>
            </Col>
            <Col md={4} className="text-center">
              <h3 className="text-info"><strong>80+</strong></h3>
              <p><strong>Voluntarios Activos</strong></p>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Padding bottom para evitar choque con nav fija abajo */}
      <div style={{ height: '3rem' }}></div>
    </>
  );
}

export default About;