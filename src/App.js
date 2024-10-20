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
import ClienteDadosPessoaisCopy from './components/ClienteDadosPessoaisCopy';
import ClientePedidos from './components/ClientePedidos';
import ClienteCompras from './components/ClienteCompras';
import ClientePagamento from './components/ClientePagamento'

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
          <Route path="/iniciar_compras" element={<ClienteCompras/>} />
          <Route path="/pagamento" element={<ClientePagamento/>} />
          <Route path="/dados_pessoais" element={<ClienteDadosPessoais/>} />
          <Route path="/changeData" element={<ClienteDadosPessoaisCopy/>} />
          <Route path="/pedidos" element={<ClientePedidos/>} />
          <Route path="/vendedor_dashboard" element={<AppHomeVendedor/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;