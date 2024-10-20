import React from 'react';
import { useNavigate } from 'react-router-dom';

function GerenciarClientes() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Gerenciar Clientes</h2>
      <div className="button-group">
        <button onClick={() => navigate('/cadastrar_cliente')}>Cadastrar Cliente</button>
        <button onClick={() => navigate('/remover_cliente')}>Remover Cliente</button>
        <button onClick={() => navigate('/listar_clientes')}>Listar Todos os Clientes</button>
        <button onClick={() => navigate('/vendedor_dashboard')}>Voltar</button>
      </div>
    </div>
  );
}

export default GerenciarClientes;