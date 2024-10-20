import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DadosPessoais() {
  const [dadosCliente, setDadosCliente] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // UseEffect para buscar os dados do cliente via API
  useEffect(() => {
    const fetchDadosCliente = async () => {
      try {
        const cpf = localStorage.getItem('clienteCpf'); // Obter CPF do cliente
        if (!cpf) {
          navigate('/login');
          return;
        }
        const response = await axios.get(`http://localhost:3001/clientes/${cpf}`);
        setDadosCliente(response.data); // Define os dados do cliente
      } catch (err) {
        setError('Erro ao carregar dados do cliente.');
        console.error('Erro ao buscar dados:', err);
      }
    };

    fetchDadosCliente();
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
            <p><strong>Time que Torce:</strong> {dadosCliente.timeTorce}</p>
            <p><strong>Cidade:</strong> {dadosCliente.cidade}</p>
            <p><strong>One Piece Fan:</strong> {dadosCliente.onePieceFan}</p>
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
