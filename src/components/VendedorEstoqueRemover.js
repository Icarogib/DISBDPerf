import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import '../styles/RemoverProduto.css'; // Importa o CSS específico

function RemoverProduto() {
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

  const handleRemover = (id) => {
    // Fazendo a requisição para remover o produto pelo ID
    axios.delete(`http://localhost:3001/produto/${id}`)
      .then(() => {
        setProdutos(produtos.filter(produto => produto.id !== id));
        alert('Produto removido com sucesso.');
      })
      .catch((error) => {
        console.error('Erro ao remover produto:', error);
      });
  };

  return (
    <div className="remover-produto-container">
      <h2>Remover Produtos do Estoque</h2>
      {produtos.length > 0 ? (
        <table className="tabela-produtos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(produto => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>R$ {produto.preco}</td>
                <td>{produto.estoque}</td>
                <td>
                  <button onClick={() => handleRemover(produto.id)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum produto disponível para remoção.</p>
      )}
      <button onClick={() => navigate('/gerenciar_estoque')}>Voltar</button>
    </div>
  );
}

export default RemoverProduto;
