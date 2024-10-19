import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function AppHome() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className='ttPrincipal'><h1>Salsicha's Perfum</h1></div>
      <button onClick={() => navigate('/login_cliente')}>Login de Cliente</button>
      <button onClick={() => navigate('/login_vendedor')}>Login de Vendedor</button>
    </div>
  );
}

export default AppHome;