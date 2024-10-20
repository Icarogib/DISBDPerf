import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function AlterarEstoque() {
  const navigate = useNavigate();
  const [itensEstoque, setItensEstoque] = useState([
    // Exemplo de itens que poderiam vir do banco de dados
    { id: 1, nome: 'Perfume A', descricao: 'Aroma floral', preco: 100.00, categoria: 'Perfume', fabricado_em_mari: true, estoque: 50 },
    { id: 2, nome: 'Perfume B', descricao: 'Aroma cítrico', preco: 150.00, categoria: 'Perfume', fabricado_em_mari: false, estoque: 30 },
    // Adicione mais itens conforme necessário
  ]);
  const [busca, setBusca] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const handleBusca = () => {
    const produto = itensEstoque.find(item => item.nome.toLowerCase() === busca.toLowerCase());
    if (produto) {
      setProdutoSelecionado(produto);
    } else {
      alert('Item não encontrado');
      setProdutoSelecionado(null);
    }
  };

  const handleAlterar = (campo, valor) => {
    setProdutoSelecionado({
      ...produtoSelecionado,
      [campo]: valor
    });
  };

  const handleSalvarAlteracoes = () => {
    // Aqui você adicionaria a lógica para salvar as alterações no banco de dados
    alert('Alterações salvas com sucesso!');
    navigate('/gerenciar_estoque');
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

      {/* Listagem de todos os itens do estoque */}
      <div className="lista-itens">
        <h3>Itens Disponíveis no Estoque:</h3>
        <ul>
          {itensEstoque.map(item => (
            <li key={item.id}>
              {item.nome} - {item.descricao} - R$ {item.preco} - Estoque: {item.estoque}
            </li>
          ))}
        </ul>
      </div>

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
