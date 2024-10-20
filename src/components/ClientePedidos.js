import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ListaPedidos() {
  // Estado que armazena os pedidos do cliente
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Carregamento dos pedidos do cliente usando Axios
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        // Obtém o CPF do cliente armazenado no localStorage (ou ID se preferir)
        const cpf = localStorage.getItem('clienteCpf');

        if (!cpf) {
          // Se não houver CPF, redireciona para o login
          navigate('/login');
          return;
        }

        // Requisição para obter os pedidos do cliente
        const response = await axios.get(`http://localhost:3001/pedidos/${cpf}`);
        
        // Atualiza o estado com os pedidos recebidos
        setPedidos(response.data);
      } catch (err) {
        console.error('Erro ao buscar pedidos do cliente:', err);
        setError('Erro ao carregar os pedidos. Tente novamente.');
      }
    };

    fetchPedidos(); // Chama a função ao montar o componente
  }, [navigate]);

  return (
    <div className="lista-pedidos-container">
      <h2>Meus Pedidos</h2>
      {/* Verifica se há pedidos para exibir */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
      <div><button onClick={() => navigate('/cliente_dashboard')}>Sair</button></div>
    </div>
  );
}

export default ListaPedidos;
/*app.get('/pedidos/:cpf', (req, res) => {
  const cpf = req.params.cpf;
  // Lógica para buscar os pedidos do cliente no banco de dados
  const pedidos = buscarPedidosPorCpf(cpf); // Exemplo de função
  if (pedidos) {
    res.json(pedidos); // Retorna os pedidos do cliente
  } else {
    res.status(404).json({ error: 'Pedidos não encontrados para este CPF' });
  }
});Usar no backend */