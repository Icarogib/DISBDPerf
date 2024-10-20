import React from 'react';
import { useNavigate } from 'react-router-dom';

function GerenciarProdutos() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Gerenciar Produtos</h2>
      <div className="button-group">
        <button onClick={() => navigate('/cadastrar_produto')}>Cadastrar Produto</button>
        <button onClick={() => navigate('/remover_produto')}>Remover Produto</button>
        <button onClick={() => navigate('/alterar_produto')}>Alterar Produto</button>
        <button onClick={() => navigate('/listar_produtos')}>Listar Produtos</button>
        <button onClick={() => navigate('/vendedor_dashboard')}>Voltar</button>
      </div>
    </div>
  );
}

export default GerenciarProdutos;
