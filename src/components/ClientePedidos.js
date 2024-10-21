import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ListaPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const cliente_id = localStorage.getItem('clienteID');

        // Requisição para obter os pedidos do cliente
        const response = await axios.get(`http://localhost:3001/venda/${cliente_id}`);

        if (response.data && response.data.pedidos) {
          // Atualiza o estado com a lista de pedidos recebida do backend
          setPedidos(response.data.pedidos);
        } else {
          setError('Nenhum pedido encontrado');
        }
      } catch (err) {
        console.error('Erro ao buscar pedidos do cliente:', err);
        setError('Erro ao carregar os pedidos. Tente novamente.');
      }
    };

    fetchPedidos();
  }, [navigate]);

  return (
    <div className="lista-pedidos-container">
      <h2>Meus Pedidos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pedidos.length > 0 ? (
        <table className="pedidos-tabela">
          <thead>
            <tr>
              <th>ID do Pedido</th>
              <th>Data</th>
              <th>Vendedor</th>
              <th>Valor Total (R$)</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.data_venda}</td>
                <td>{pedido.vendedor_id}</td>
                <td>{parseFloat(pedido.total_venda).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Você ainda não fez nenhum pedido.</p>
      )}
      <div><button onClick={() => navigate('/cliente_dashboard')}>Sair</button></div>
    </div>
  );
}

export default ListaPedidos;
