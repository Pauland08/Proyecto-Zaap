// src/components/Auth/Login.js
import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Llamada al backend Flask
      const res = await axios.post('http://localhost:8000/login', {
        correo: email,
        contraseña: password
      });

      const token = res.data.token;
      localStorage.setItem('token', token);

      // Decodificar payload del JWT
      const payload = JSON.parse(atob(token.split('.')[1]));

      // Redirigir según rol
      if (payload.rol === 'Administrador') {
        navigate('/dashboard');
      } else {
        navigate('/'); // o a otra vista pública
      }
    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas o error de servidor');
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