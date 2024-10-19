import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function AppHome() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className='ttPrincipal'><h1>Salsicha's Perfum</h1></div>
      {/* Botão de login no canto superior direito */}
      <button className="login-button" onClick={() => navigate('/login')}>Login</button>
      {/* Conteúdo do catálogo pode ser adicionado aqui */}
      <div className="catalog-container">
        <h2>Catálogo de Itens</h2>
        {/* Aqui você pode adicionar itens do catálogo quando estiver pronto */}
      </div>
    </div>
  );
}

export default AppHome;
