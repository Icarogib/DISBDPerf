import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function GerenciarPedidos() {
    const navigate = useNavigate();
  // Exemplo de dados de pedidos pendentes
  const [pedidosPendentes, setPedidosPendentes] = useState([
    { id: 1, cliente: 'João da Silva', total: 150.00, status: 'Pendente' },
    { id: 2, cliente: 'Maria Souza', total: 250.00, status: 'Pendente' },
  ]);

  // Função para confirmar o pedido
  const confirmarPedido = (id) => {
    const novosPedidos = pedidosPendentes.map(pedido => {
      if (pedido.id === id) {
        return { ...pedido, status: 'Confirmado' };
      }
      return pedido;
    });
    setPedidosPendentes(novosPedidos);
  };

  // Função para cancelar o pedido
  const cancelarPedido = (id) => {
    const novosPedidos = pedidosPendentes.map(pedido => {
      if (pedido.id === id) {
        return { ...pedido, status: 'Cancelado' };
      }
      return pedido;
    });
    setPedidosPendentes(novosPedidos);
  };

  return (
    <div className="gerenciar-pedidos-container">
      <h2>Gerenciar Pedidos Pendentes</h2>
      {pedidosPendentes.map(pedido => (
        <div key={pedido.id} className="pedido">
          <p><strong>Cliente:</strong> {pedido.cliente}</p>
          <p><strong>Total:</strong> R${pedido.total.toFixed(2)}</p>
          <p><strong>Status:</strong> {pedido.status}</p>
          {pedido.status === 'Pendente' && (
            <div className="botoes-acao">
              <button className="confirmar-button" onClick={() => confirmarPedido(pedido.id)}>Confirmar</button>
              <button className="cancelar-button" onClick={() => cancelarPedido(pedido.id)}>Cancelar</button>
            </div>
          )}
        </div>
      ))}
      <button onClick={() => navigate('/vendedor_dashboard')}>Voltar</button>
    </div>
  );
}

export default GerenciarPedidos;
