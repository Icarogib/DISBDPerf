import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DadosPessoais() {
  const navigate = useNavigate();
  const [dadosCliente, setDadosCliente] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
     // Obtém o CPF do cliente do localStorage
     const cpf = localStorage.getItem('clienteCpf');

     // Se não tiver o CPF redireciona para a pagina de login
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
           setDadosCliente(response.data.cliente); // Atualiza o nome do cliente com os dados recebidos
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

  // Função para redirecionar para a página de edição
  const handleAtualizar = () => {
    navigate('/changeData');
  };

  return (
    <div className="dados-pessoais-container">
      <div className="dados-pessoais">
        <div className='ttDP'><h2>Dados Pessoais</h2></div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {dadosCliente ? (
          <div className='dados'>
            <p><strong>Nome:</strong> {dadosCliente.nome}</p>
            <p><strong>CPF:</strong> {dadosCliente.cpf}</p>
            <p><strong>Email:</strong> {dadosCliente.email}</p>
            <p><strong>Telefone:</strong> {dadosCliente.telefone}</p>
            <p><strong>Endereço:</strong> {dadosCliente.endereco}</p>
            <p><strong>Flamenguista?:</strong> {dadosCliente.torce_fla ? 'Sim' : 'Não'}</p>
            <p><strong>Cidade:</strong> {dadosCliente.cidade}</p>
            <p><strong>One Piece Fan:</strong> {dadosCliente.onepiece ? 'Sim' : 'Não'}</p>
          </div>
        ) : (
          <p>Carregando dados do cliente...</p>
        )}
        <button className="att-button" onClick={handleAtualizar}>
          Atualizar Dados
        </button>
        <button onClick={() => navigate('/cliente_dashboard')}>Sair</button>
      </div>
    </div>
  );
}

export default DadosPessoais;
