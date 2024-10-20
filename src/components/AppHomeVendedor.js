import React, { useState } from 'react'; // Adicione useState aqui
import '../App.css';
import { useNavigate } from 'react-router-dom';

function AppHomeVendedor() {
  const navigate = useNavigate();
  const [nomeCliente, setNomeCliente] = useState(''); // Estado para armazenar o nome do cliente
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtém o CPF do cliente do localStorage
    const cpf = localStorage.getItem('vendedorCpf');

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
      <h2>Bem-vindo, Vendedor {nomeVendedor}</h2> {/* Mensagem de boas-vindas */}
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
