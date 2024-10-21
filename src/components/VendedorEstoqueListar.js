import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//import '../styles/ListarProdutos.css'; // Importa o CSS específico

function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fazendo a requisição para buscar os produtos
    axios.get('http://localhost:3001/produto')
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, []);

  return (
    <div className="listar-produtos-container">
      <h2>Produtos no Estoque</h2>
      {produtos.length > 0 ? (
        <ul className="lista-produtos">
          {produtos.map(produto => (
            <li key={produto.id}>
              {produto.nome} - {produto.descricao} - Preço: R$ {produto.preco} - Estoque: {produto.estoque}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum produto encontrado no estoque.</p>
      )}
      <button onClick={() => navigate('/gerenciar_estoque')}>Voltar</button>
    </div>
  );
}

export default ListarProdutos;
