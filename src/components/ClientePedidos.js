import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function ListaPedidos() {
  // Estado que armazena os pedidos do cliente
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();
  // Simulação de carregamento de pedidos (no caso real, você chamaria uma API)
  useEffect(() => {
    // Simulação de pedidos (em um cenário real, os dados viriam de um backend)
    const pedidosDoCliente = [
      { id: 1, data: '2024-10-01', valorTotal: 150.75, status: 'Entregue' },
      { id: 2, data: '2024-09-15', valorTotal: 220.00, status: 'Em trânsito' },
      { id: 3, data: '2024-08-28', valorTotal: 90.50, status: 'Cancelado' },
    ];

    setPedidos(pedidosDoCliente);
  }, []);

  return (
    <div className="lista-pedidos-container">
      <h2>Meus Pedidos</h2>
      {/* Verifica se há pedidos para exibir */}
      {pedidos.length > 0 ? (
        <table className="pedidos-tabela">
          <thead>
            <tr>
              <th>ID do Pedido</th>
              <th>Data</th>
              <th>Valor Total (R$)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.data}</td>
                <td>{pedido.valorTotal.toFixed(2)}</td>
                <td>{pedido.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Você ainda não fez nenhum pedido.</p>
      )}
      <div><button onClick={() => navigate('/cliente_dashboard')}>Sair</button>
      </div>
    </div>
  );
}

export default ListaPedidos;