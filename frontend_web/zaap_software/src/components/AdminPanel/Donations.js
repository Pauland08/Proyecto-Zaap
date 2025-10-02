import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Bar
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ingresos = [
  { id: 1, nombre: 'Laura Gómez', monto: 50000, metodo: 'Nequi' },
  { id: 2, nombre: 'Juan Pérez', monto: 80000, metodo: 'Daviplata' }
];

const data = {
  labels: ['Donaciones'],
  datasets: [
    {
      label: 'Total recibido',
      data: [ingresos.reduce((acc, d) => acc + d.monto, 0)],
      backgroundColor: '#ffc107'
    }
  ]
};

function Donations() {
  return (
    <Container className="mt-4">
      <h3>Gestión de donaciones</h3>
      <Bar data={data} />
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Donante</th>
            <th>Monto</th>
            <th>Método</th>
          </tr>
        </thead>
        <tbody>
          {ingresos.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.nombre}</td>
              <td>${d.monto}</td>
              <td>{d.metodo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Donations;
