import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function LoginVendedor() {
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (cpf) {
      // Lógica de autenticação do vendedor
      console.log('Vendedor autenticado com CPF:', cpf);
      navigate('/vendedor_dashboard');
    } else {
      alert('Por favor, insira o CPF.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login de Vendedor</h2>
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

export default LoginVendedor;
