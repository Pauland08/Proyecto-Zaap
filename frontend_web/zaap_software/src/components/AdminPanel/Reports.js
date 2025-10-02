import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Bar y pie
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const donacionesData = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
  datasets: [
    {
      label: 'Donaciones ($)',
      data: [500000, 750000, 300000, 900000],
      backgroundColor: '#ffc107'
    }
  ]
};

const adopcionesData = {
  labels: ['Perros', 'Gatos', 'Otros'],
  datasets: [
    {
      label: 'Adopciones',
      data: [25, 15, 5],
      backgroundColor: ['#198754', '#0dcaf0', '#6f42c1']
    }
  ]
};

function Reports() {
  return (
    <Container className="mt-4">
      <h3>Reportes estadísticos</h3>
      <Row>
        <Col md={6}>
          <h5>Donaciones mensuales</h5>
          <Bar data={donacionesData} />
        </Col>
        <Col md={6}>
          <h5>Adopciones por especie</h5>
          <Pie data={adopcionesData} />
        </Col>
      </Row>
    </Container>
  );
}

export default Reports;
