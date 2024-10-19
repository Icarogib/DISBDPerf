import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function LoginCliente() {
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (cpf) {
      // Lógica de autenticação do cliente
      console.log('Cliente autenticado com CPF:', cpf);
      navigate('/cliente_dashboard');
    } else {
      alert('Por favor, insira o CPF.');
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
    </div>
  );
}

export default LoginCliente;
