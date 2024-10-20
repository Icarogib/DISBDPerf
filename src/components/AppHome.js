import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function AppHome() {
  const navigate = useNavigate();

  return (
    <div
      className="container"
      /*style={{
        backgroundImage: `url('/img/image.png')`,
        backgroundSize: 'cover', // Faz a imagem cobrir todo o fundo
        backgroundPosition: 'center', // Centraliza a imagem
        height: '100vh' // Ocupa toda a altura da viewport
      }}*/
    >
      <div className='ttPrincipal1'><h1>Salsicha's Perfumaria</h1></div>
      {/* Botão de login no canto superior direito */}
      <button className="login-button" 
      onClick={() => navigate('/login')}>Login</button>
      {/* Conteúdo do catálogo pode ser adicionado aqui */}
      <div className="catalog-container">
        <h2>Catálogo de Itens</h2>
        {/* Aqui você pode adicionar itens do catálogo quando estiver pronto */}
      </div>
    </div>
  );
}

export default AppHome;
