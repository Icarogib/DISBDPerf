import React, { useState, useEffect } from 'react'; // Adicione useState aqui
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AppHomeVendedor() {
  const navigate = useNavigate();
  const [nomeCliente, setNomeCliente] = useState(''); // Estado para armazenar o nome do cliente
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtém o CPF do cliente do localStorage
    const cpf = localStorage.getItem('vendedorCpf');
    const nomeVendedor = "macaco";

    // Se o CPF não estiver presente, redireciona para a página de login
    if (!cpf) {
      navigate('/login');
      return;
    }

    // Busca o nome do cliente com base no CPF
    const fetchCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cliente/${cpf}`);
        setNomeCliente(response.data.nome); // Atualiza o nome do cliente com os dados recebidos
      } catch (err) {
        console.error('Erro ao buscar dados do cliente:', err);
        setError('Erro ao carregar informações do cliente.');
      }
    };

    fetchCliente(); // Chama a função ao montar o componente
  }, [navigate]);

  return (
    <div className="container">
      <h2>Bem-vindo, Vendedor nomeVendedor</h2> {/* Mensagem de boas-vindas */}
      <h1>Salsichas's Perfumaria</h1>
      
      {/* Botões adicionais */}
      <div className='Nomes'>
      <div className="button_clientes">
      <button onClick={() => navigate('/gerenciar_cliente')}>Gerenciar Clientes</button>
        <button onClick={() => navigate('/gerenciar_estoque')}>Gerenciar Estoque</button>
        <button onClick={() => navigate('/autorizar_pedido')}>Gerenciar Pedidos</button>
        <button onClick={() => navigate('/')}>Sair</button>
        </div>
      </div>
    </div>
  );
}

export default AppHomeVendedor;


/*app.get('/cliente/:cpf', (req, res) => {
  const cpf = req.params.cpf;
  // Lógica para buscar o cliente pelo CPF no banco de dados
  const cliente = buscarClientePorCpf(cpf); // Exemplo de função
  if (cliente) {
    res.json(cliente); // Retorna os dados do cliente
  } else {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
});Usar no backend*/ 