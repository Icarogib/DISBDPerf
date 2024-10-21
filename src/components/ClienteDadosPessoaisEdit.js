import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChangeData() {
  const [dadosCliente, setDadosCliente] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // UseEffect para carregar os dados do cliente
  useEffect(() => {
    const fetchDadosCliente = async () => {
      try {
        const cpf = localStorage.getItem('clienteCpf');
        if (!cpf) {
          navigate('/login');
          return;
        }
        const response = await axios.get(`http://localhost:3001/clientes/${cpf}`);
        setDadosCliente(response.data);
      } catch (err) {
        setError('Erro ao carregar dados do cliente.');
        console.error('Erro ao buscar dados:', err);
      }
    };

    fetchDadosCliente();
  }, [navigate]);

  // Função para salvar os dados atualizados
  const handleSalvar = async () => {
    try {
      const cpf = localStorage.getItem('clienteCpf');
      if (!cpf) {
        navigate('/login');
        return;
      }
      await axios.put(`http://localhost:3001/clientes/${cpf}`, dadosCliente);
      alert('Dados atualizados com sucesso!');
      navigate('/dados_pessoais'); // Redireciona após salvar
    } catch (err) {
      setError('Erro ao salvar os dados. Tente novamente.');
      console.error('Erro ao salvar dados:', err);
    }
  };

  // Função para lidar com as alterações nos campos de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosCliente({
      ...dadosCliente,
      [name]: value,
    });
  };

  return (
    <div className="dados-pessoais-container">
      <div className="dados-pessoais">
        <div className="ttDP"><h2>Atualizar Dados Pessoais</h2></div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {dadosCliente ? (
          <div className="dados">
            <p><strong>Nome:</strong>
              <input type="text" name="nome" value={dadosCliente.nome} onChange={handleChange} />
            </p>
            <p><strong>CPF:</strong>
              <input type="text" name="cpf" value={dadosCliente.cpf} onChange={handleChange} />
            </p>
            <p><strong>Email:</strong>
              <input type="email" name="email" value={dadosCliente.email} onChange={handleChange} />
            </p>
            <p><strong>Telefone:</strong>
              <input type="text" name="telefone" value={dadosCliente.telefone} onChange={handleChange} />
            </p>
            <p><strong>Endereço:</strong>
              <input type="text" name="endereco" value={dadosCliente.endereco} onChange={handleChange} />
            </p>
            <p><strong>Time que Torce:</strong>
              <input type="text" name="timeTorce" value={dadosCliente.timeTorce} onChange={handleChange} />
            </p>
            <p><strong>Cidade:</strong>
              <input type="text" name="cidade" value={dadosCliente.cidade} onChange={handleChange} />
            </p>
            <p><strong>One Piece Fan:</strong>
              <input type="text" name="onePieceFan" value={dadosCliente.onePieceFan} onChange={handleChange} />
            </p>
          </div>
        ) : (
          <p>Carregando dados do cliente...</p>
        )}
        <button className="att-button" onClick={handleSalvar}>Salvar Dados</button>
        <button onClick={() => navigate('/dados_pessoais')}>Cancelar</button>
      </div>
    </div>
  );
}

export default ChangeData;
