// src/components/Auth/Login.js
import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      // Verificación local de credenciales del admin
      if (email === 'admin@gmail.com' && password === 'admin123') {
        // Simular usuario admin autenticado
        const adminUser = {
          email: 'admin@gmail.com',
          displayName: 'Administrador',
          uid: 'admin-uid-123'
        };
        
        // Llamar login con el usuario simulado
        await login(adminUser);
        
        // Redirigir al dashboard
        navigate('/dashboard');
      } else {
        // Credenciales incorrectas
        setError('Usuario o contraseña incorrectos. Use admin@gmail.com / admin123');
      }
      
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
      console.error('Error en login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              
              <Button 
                disabled={loading} 
                className="w-100" 
                type="submit"
                variant="primary"
              >
                {loading ? 'Iniciando...' : 'Entrar'}
              </Button>
            </Form>
            
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>
          </Card.Body>
        </Card>
        
        <div className="w-100 text-center mt-2">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </div>
      </div>
    </Container>
  );
}

export default Login;