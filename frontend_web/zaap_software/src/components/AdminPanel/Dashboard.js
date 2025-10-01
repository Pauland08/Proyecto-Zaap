// src/components/AdminPanel/Dashboard.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

function Dashboard() {
  const stats = [
    { key: 'usuarios', label: 'Usuarios Registrados', value: 120, color: 'primary' },
    { key: 'animales', label: 'Animales en Refugio', value: 45, color: 'success' },
    { key: 'adopciones', label: 'Adopciones Este Mes', value: 8, color: 'info' },
    { key: 'donaciones', label: 'Donaciones Recibidas', value: 32, color: 'warning' },
    { key: 'reportes', label: 'Reportes Pendientes', value: 18, color: 'danger' },
    { key: 'campañas', label: 'Campañas Activas', value: 7, color: 'secondary' }
  ];

  const recentActivities = [
    { id: 1, activity: 'Nueva adopción registrada - Max adoptado por familia García', time: '2 horas ago', type: 'success' },
    { id: 2, activity: 'Donación recibida - $500 de donante anónimo', time: '4 horas ago', type: 'info' },
    { id: 3, activity: 'Reporte de animal perdido - Zona Norte', time: '6 horas ago', type: 'warning' },
    { id: 4, activity: 'Nuevo voluntario registrado - María López', time: '1 día ago', type: 'primary' },
    { id: 5, activity: 'Campaña de vacunación completada', time: '2 días ago', type: 'success' }
  ];

  return (
    <>
      <AdminNavbar />
      
      <Container fluid className="pt-5 mt-4">
        <Row className="mb-4">
          <Col>
            <h1>Panel de Control</h1>
            <p className="text-muted">Resumen general de la fundación</p>
          </Col>
        </Row>

        {/* Cards de estadísticas */}
        <Row className="mb-4">
          {stats.map((stat) => (
            <Col lg={4} md={6} className="mb-3" key={stat.key}>
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <Card.Title className="mb-1">{stat.value}</Card.Title>
                      <Card.Text className="text-muted small">
                        {stat.label}
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer className={`bg-${stat.color} bg-opacity-10 border-${stat.color}`}>
                  <small className={`text-${stat.color}`}>
                    Actualizado recientemente
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Actividad reciente */}
        <Row>
          <Col lg={8}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Actividad Reciente</h5>
              </Card.Header>
              <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="d-flex align-items-start mb-3 pb-3 border-bottom">
                    <div className={`badge bg-${activity.type} me-3 mt-1`} style={{ minWidth: '8px', height: '8px' }}></div>
                    <div>
                      <p className="mb-1">{activity.activity}</p>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Acciones Rápidas</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Button variant="primary" size="sm">
                    Registrar Nueva Adopción
                  </Button>
                  <Button variant="success" size="sm">
                    Agregar Nuevo Animal
                  </Button>
                  <Button variant="info" size="sm">
                    Registrar Donación
                  </Button>
                  <Button variant="warning" size="sm">
                    Ver Reportes Pendientes
                  </Button>
                  <Button variant="secondary" size="sm">
                    Crear Nueva Campaña
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Alertas importantes */}
            <Card className="mt-3">
              <Card.Header>
                <h6 className="mb-0 text-danger">Alertas Importantes</h6>
              </Card.Header>
              <Card.Body>
                <small className="text-danger d-block mb-2">
                    3 animales necesitan atención médica urgente
                </small>
                <small className="text-warning d-block mb-2">
                    Nivel bajo de donaciones este mes
                </small>
                <small className="text-info d-block">
                    18 reportes pendientes de revisión
                </small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
