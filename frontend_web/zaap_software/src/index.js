import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { AuthProvider } from './context/AuthContext';

// Importar estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);