// src/components/Auth/RecoverPassword.js
import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return setError('El email es obligatorio');
    }

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Se ha enviado un enlace de recuperación a tu email');
    } catch (error) {
      setError('Error al enviar el email de recuperación: ' + error.message);
      console.error('Error en recuperación:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">¿Olvidaste tu contraseña?</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico registrado</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu email"
                />
              </Form.Group>
              
              <Button 
                disabled={loading} 
                className="w-100" 
                type="submit"
                variant="primary"
              >
                {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
              </Button>
            </Form>
            
            <div className="w-100 text-center mt-3">
              <Link to="/login">Volver al inicio de sesión</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default RecoverPassword;