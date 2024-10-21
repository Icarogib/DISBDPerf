import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AppHome() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Fazendo a requisição para buscar os produtos
    axios.get('http://localhost:3001/produto')
      .then((response) => {
        console.log(response);
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, []);


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
        <div className="listar-produtos-container">
        {produtos.length > 0 ? (
          <ul className="lista-produtos">
            {produtos.map(produto => (
              <li key={produto.id}>
                {produto.nome} - {produto.descricao} - Preço: R$ {produto.preco}
              </li>
            ))}
          </ul>
        ) : (
          <p>Sem produtos no estoque D: Tente mais tarde!.</p>
        )}
      </div>
        {/* Aqui você pode adicionar itens do catálogo quando estiver pronto */}
      </div>
    </div>
  );
}

export default AppHome;
