import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importação do Axios

function AlterarEstoque() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState(''); // Para exibir mensagens de sucesso ou erro

  // Função para buscar item pelo nome no banco de dados
  const handleBusca = () => {
    axios
      .get(`http://localhost:5000/produtos/nome/${busca}`) // Substitua pela URL do seu backend
      .then((response) => {
        if (response.data) {
          setProdutoSelecionado(response.data);
          setMensagem('');
        } else {
          setProdutoSelecionado(null);
          setMensagem('Produto não encontrado.');
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar produto:', error);
        setMensagem('Erro ao buscar o produto.');
      });
  };

  // Função para alterar os dados do produto
  const handleAlterar = (campo, valor) => {
    setProdutoSelecionado({
      ...produtoSelecionado,
      [campo]: valor,
    });
  };

  // Função para salvar as alterações no banco de dados
  const handleSalvarAlteracoes = () => {
    if (produtoSelecionado) {
      axios
        .put(`http://localhost:5000/produtos/${produtoSelecionado.id}`, produtoSelecionado) // Substitua pela URL correta do backend
        .then(() => {
          setMensagem('Alterações salvas com sucesso!');
          setProdutoSelecionado(null); // Limpa o produto selecionado após salvar
          setBusca(''); // Limpa o campo de busca
        })
        .catch((error) => {
          console.error('Erro ao salvar alterações:', error);
          setMensagem('Erro ao salvar as alterações.');
        });
    }
  };

  return (
    <div className="alterar-estoque-container">
      <h2>Alterar Itens do Estoque</h2>

      {/* Campo de busca */}
      <div>
        <input
          type="text"
          placeholder="Buscar item pelo nome"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button onClick={handleBusca}>Buscar</button>
      </div>

      {/* Mensagem de erro ou sucesso */}
      {mensagem && <p>{mensagem}</p>}

      {/* Se o item foi selecionado para alteração */}
      {produtoSelecionado && (
        <div className="produto-alteracao">
          <h3>Alterar Produto: {produtoSelecionado.nome}</h3>
          <label>Descrição:</label>
          <input
            type="text"
            value={produtoSelecionado.descricao}
            onChange={(e) => handleAlterar('descricao', e.target.value)}
          />
          <label>Preço:</label>
          <input
            type="number"
            step="0.01"
            value={produtoSelecionado.preco}
            onChange={(e) => handleAlterar('preco', e.target.value)}
          />
          <label>Categoria:</label>
          <input
            type="text"
            value={produtoSelecionado.categoria}
            onChange={(e) => handleAlterar('categoria', e.target.value)}
          />
          <label>Fabricado em Mari:</label>
          <input
            type="checkbox"
            checked={produtoSelecionado.fabricado_em_mari}
            onChange={(e) => handleAlterar('fabricado_em_mari', e.target.checked)}
          />
          <label>Estoque:</label>
          <input
            type="number"
            value={produtoSelecionado.estoque}
            onChange={(e) => handleAlterar('estoque', e.target.value)}
          />
          <button onClick={handleSalvarAlteracoes}>Salvar Alterações</button>
        </div>
      )}
      <button onClick={() => navigate('/gerenciar_estoque')}>Voltar</button>
    </div>
  );
}

export default AlterarEstoque;
