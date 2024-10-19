import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppHome from './components/AppHome';
import LoginCliente from './components/LoginCliente';
import LoginVendedor from './components/LoginVendedor';
import Login from './components/Login';
import AppHomeCliente from './components/AppHomeCliente';
import AppHomeVendedor from './components/AppHomeVendedor';
import ClienteDadosPessoais from './components/ClienteDadosPessoais';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login_cliente" element={<LoginCliente />} />
          <Route path="/login_vendedor" element={<LoginVendedor />} />
          {/* Rotas para dashboards após login */}
          <Route path="/cliente_dashboard" element={<AppHomeCliente/>} />
          <Route path="/dados_pessoais" element={<ClienteDadosPessoais/>} />
          <Route path="/vendedor_dashboard" element={<AppHomeVendedor/>} />
          <Route path="/sair" element={<AppHome/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;