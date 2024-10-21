import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChangeData() {
  const navigate = useNavigate();
  const [dadosCliente, setDadosCliente] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const cpf = localStorage.getItem('clienteCpf');

    if (!cpf) {
      navigate('/login');
      return;
    }

    const fetchCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cliente/${cpf}`);
        if (response.data.success) {
          setDadosCliente(response.data.cliente);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('Erro ao buscar dados do cliente:', err);
        setError('Erro ao carregar informações do cliente.');
      }
    };

    fetchCliente();
  }, [navigate]);

  const handleSalvar = async () => {
    try {
      if (!dadosCliente || !dadosCliente.id) {
        setError('Dados do cliente inválidos.');
        return;
      }

      // Envia os dados atualizados para a API
      await axios.put(`http://localhost:3001/cliente/${dadosCliente.id}`, dadosCliente);
      alert('Dados atualizados com sucesso!');
      navigate('/dados_pessoais');
    } catch (err) {
      setError('Erro ao salvar os dados. Tente novamente.');
      console.error('Erro ao salvar dados:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // O campo onepiece deve ser tratado como booleano
    const updatedValue = name === 'onePieceFan' ? value === 'true' : value;

    setDadosCliente({
      ...dadosCliente,
      [name]: updatedValue,
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
            <p><strong>Flamenguista?:</strong>
            <input
              type="checkbox"
              name="torce_fla"
              checked={dadosCliente.torce_fla}
              onChange={(e) => handleChange({ target: { name: 'torce_fla', value: e.target.checked } })}
            />
          </p>
            <p><strong>Cidade:</strong>
              <input type="text" name="cidade" value={dadosCliente.cidade} onChange={handleChange} />
            </p>
            <p><strong>One Piece Fan:</strong>
            <input
              type="checkbox"
              name="onepiece"
              checked={dadosCliente.onepiece}
              onChange={(e) => handleChange({ target: { name: 'onepiece', value: e.target.checked } })}
            />
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
