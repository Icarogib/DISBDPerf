import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginCliente() {
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (cpf) {
      try {
        // Faz uma requisição POST para o endpoint de login, enviando o CPF
        const response = await axios.post('http://localhost:3001/login_cliente', { cpf });

        // Se a resposta for bem-sucedida, redireciona o cliente para o dashboard
        if (response.data.success) {
          console.log('Cliente autenticado com CPF:', cpf);
          // Armazena o CPF no localStorage após login bem-sucedido
          localStorage.setItem('clienteCpf', cpf);
          navigate('/cliente_dashboard');
        } else {
          // Se a autenticação falhar, exibe a mensagem de erro
          setError('CPF não encontrado ou inválido.');
        }
      } catch (err) {
        console.error('Erro ao autenticar cliente:', err);
        setError('Erro ao autenticar cliente. Tente novamente.');
      }
    } else {
      setError('Por favor, insira o CPF.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login de Cliente</h2>
      <input
        type="text"
        placeholder="Digite seu CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate('/login')}>Voltar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe mensagem de erro se houver */}
    </div>
  );
}

export default LoginCliente;
