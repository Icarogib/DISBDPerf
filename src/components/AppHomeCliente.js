import React, { useState, useEffect } from 'react'; 
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AppHomeCliente() {
  const navigate = useNavigate();
  const [nomeCliente, setNomeCliente] = useState(''); // Estado para armazenar o nome do cliente
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtém o CPF do cliente do localStorage
    const cpf = localStorage.getItem('clienteCpf');

    // Se o CPF não estiver presente, redireciona para a página de login
    if (!cpf) {
      navigate('/login');
      return;
    }

    // Busca os dados do cliente com base no CPF
    const fetchCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cliente/${cpf}`);
        // Verifica se a resposta foi bem-sucedida
        if (response.data.success) {
          setNomeCliente(response.data.cliente.nome); // Atualiza o nome do cliente com os dados recebidos
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('Erro ao buscar dados do cliente:', err);
        setError('Erro ao carregar informações do cliente.');
      }
    };

    fetchCliente(); // Chama a função ao montar o componente
  }, [navigate]);

  return (
    <div className="container">
      <div>
        <h2>Bem-vindo, Cliente {nomeCliente}</h2> {/* Mensagem de boas-vindas com nome real */}
        <div className='ttPrincipal'><h1>Salsichas's Perfumaria</h1></div>
        <div className="catalog-container"></div>
      </div>
      {/* Botões adicionais */}
      <div className="button_clientes">
        <button onClick={() => navigate('/iniciar_compras')}>Iniciar Compras</button>
        <button onClick={() => navigate('/dados_pessoais')}>Ver Dados Pessoais</button>
        <button onClick={() => navigate('/pedidos')}>Ver Pedidos Feitos</button>
        <button onClick={() => navigate('/')}>Sair</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe mensagem de erro se houver */}
    </div>
  );
}

export default AppHomeCliente;
