import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AppHome() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [backgroundVisible, setBackgroundVisible] = useState(false); // Estado para controlar a visibilidade da imagem de fundo

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

  // Função para alternar a visibilidade da imagem de fundo
  const toggleBackground = () => {
    setBackgroundVisible(!backgroundVisible);
  };

  return (
    <div
      className="container"
      style={{
        backgroundImage: backgroundVisible ? `url('/img/image.png')` : 'none', // Aplica a imagem de fundo se backgroundVisible for true
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <div className='ttPrincipal1'>
        <h1 
          onClick={toggleBackground} // Adiciona a função de clique ao título
          style={{
            cursor: 'pointer', // Muda o cursor para indicar que é clicável
            background: 'none', // Remove qualquer fundo
            color: 'black', // Você pode escolher a cor que preferir
          }}
        >
          Salsicha's Perfumaria
        </h1>
      </div>
      {/* Botão de login no canto superior direito */}
      <button className="login-button" onClick={() => navigate('/login')}>Login</button>
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
      </div>
    </div>
  );
}

export default AppHome;
