import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importação do Axios

function CadastrarProduto() {
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: '',
    fabricado_em: false,
    estoque: ''
  });
  const [mensagem, setMensagem] = useState(''); // Para exibir mensagens de sucesso ou erro

  const handleChange = (campo, valor) => {
    setProduto({
      ...produto,
      [campo]: valor
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar o produto para o backend via POST
    axios
      .post('http://localhost:3001/produto', produto) // Substitua pela URL correta do backend
      .then((response) => {
        setMensagem('Produto cadastrado com sucesso!');
        // Após cadastrar, limpa os campos
        setProduto({
          nome: '',
          descricao: '',
          preco: '',
          categoria: '',
          fabricado_em: false,
          estoque: ''
        });
      })
      .catch((error) => {
        console.error('Erro ao cadastrar produto:', error);
        setMensagem('Erro ao cadastrar o produto. Tente novamente.');
      });
  };

  return (
    <div className="cadastrar-produto-container">
      <h2>Cadastrar Novo Produto</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          value={produto.nome}
          onChange={(e) => handleChange('nome', e.target.value)}
          required
        />

        <label>Descrição:</label>
        <input
          type="text"
          value={produto.descricao}
          onChange={(e) => handleChange('descricao', e.target.value)}
          required
        />

        <label>Preço:</label>
        <input
          type="number"
          step="0.01"
          value={produto.preco}
          onChange={(e) => handleChange('preco', e.target.value)}
          required
        />

        <label>Categoria:</label>
        <input
          type="text"
          value={produto.categoria}
          onChange={(e) => handleChange('categoria', e.target.value)}
          required
        />

        <label>Fabricado em Mari:</label>
        <input
          type="checkbox"
          checked={produto.fabricado_em}
          onChange={(e) => handleChange('fabricado_em', e.target.checked)}
        />

        <label>Estoque:</label>
        <input
          type="number"
          value={produto.estoque}
          onChange={(e) => handleChange('estoque', e.target.value)}
          required
        />

        <button type="submit">Cadastrar Produto</button>
      </form>

      {/* Mensagem de sucesso ou erro */}
      {mensagem && <p>{mensagem}</p>}

      <button onClick={() => navigate('/gerenciar_estoque')}>Voltar</button>
    </div>
  );
}

export default CadastrarProduto;
