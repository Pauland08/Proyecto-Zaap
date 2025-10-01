// src/components/Public/AnimalsGallery.js
import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import perro1 from '../../assets/images/perro1.jpg';
import perro2 from '../../assets/images/perro2.jpg';
import perro3 from '../../assets/images/perro3.jpg';
import gato1 from '../../assets/images/gato1.jpg';
import gato2 from '../../assets/images/gato2.jpg';
import gato3 from '../../assets/images/gato3.jpg';
import '../../styles/main.css';

const animales = [
  { id: 1, nombre: 'Firulais', especie: 'Perro', edad: '2 años', ubicacion: 'Bogotá', imagen: perro1, disponible: true },
  { id: 2, nombre: 'Rex', especie: 'Perro', edad: '3 años', ubicacion: 'Bogotá', imagen: perro2, disponible: true },
  { id: 3, nombre: 'Bruno', especie: 'Perro', edad: '1 año', ubicacion: 'Bogotá', imagen: perro3, disponible: false },
  { id: 4, nombre: 'Michi', especie: 'Gato', edad: '1 año', ubicacion: 'Bogotá', imagen: gato1, disponible: true },
  { id: 5, nombre: 'Luna', especie: 'Gato', edad: '2 años', ubicacion: 'Bogotá', imagen: gato2, disponible: false },
  { id: 6, nombre: 'Nala', especie: 'Gato', edad: '3 años', ubicacion: 'Bogotá', imagen: gato3, disponible: true }
];

function AnimalsGallery() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleAdoptClick = () => {
    if (!currentUser) navigate('/login');
    else navigate('/adopt');
  };

  return (
    <Container className="animals-gallery mt-4">
      <h1 className="text-center mb-4"><strong>Animales de Nuestra Fundación</strong></h1>
      <div className="masonry">
        {animales.map(animal => (
          <Card className="gallery-card" key={animal.id}>
            <Card.Img variant="top" src={animal.imagen} alt={animal.nombre} style={{height:"200px", objectFit:"cover"}}/>
            <Card.Body>
              <Card.Title>{animal.nombre}</Card.Title>
              <Card.Text>
                <strong>Especie:</strong> {animal.especie}<br/>
                <strong>Edad:</strong> {animal.edad}<br/>
                <strong>Ubicación:</strong> {animal.ubicacion}
              </Card.Text>
              {animal.disponible ? (
                <Button variant="primary" size="sm" onClick={handleAdoptClick}>
                  Adoptar
                </Button>
              ) : (
                <Button variant="secondary" size="sm" disabled>
                  No disponible
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default AnimalsGallery;