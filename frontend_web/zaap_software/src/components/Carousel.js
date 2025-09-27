import React from 'react';
import { Carousel } from 'react-bootstrap';
import perro1 from '../assets/images/perro1.jpg';
import gato1 from '../assets/images/gato1.jpg';

function AdoptionCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={perro1} alt="Perro en adopción" />
        <Carousel.Caption>
          <h5>Adóptame</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={gato1} alt="Gato en adopción" />
        <Carousel.Caption>
          <h5>Busco hogar</h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default AdoptionCarousel;
