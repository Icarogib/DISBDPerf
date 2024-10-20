import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function IniciarCompras() {
  const navigate = useNavigate();

  // Lista de itens disponíveis (pode ser substituída por dados dinâmicos vindos de uma API ou banco de dados)
  const [itens, setItens] = useState([
    { id: 1, nome: 'Perfume 1', preco: 100, quantidade: 0, selecionado: false },
    { id: 2, nome: 'Perfume 2', preco: 150, quantidade: 0, selecionado: false },
    { id: 3, nome: 'Perfume 3', preco: 200, quantidade: 0, selecionado: false },
    { id: 4, nome: 'Perfume 4', preco: 250, quantidade: 0, selecionado: false },
  ]);

  // Função para selecionar/desselecionar um item
  const handleSelectItem = (index) => {
    const novosItens = [...itens];
    novosItens[index].selecionado = !novosItens[index].selecionado;
    setItens(novosItens);
  };

  // Função para aumentar a quantidade de um item
  const handleIncreaseQuantity = (index) => {
    const novosItens = [...itens];
    novosItens[index].quantidade += 1;
    setItens(novosItens);
  };

  // Função para diminuir a quantidade de um item
  const handleDecreaseQuantity = (index) => {
    const novosItens = [...itens];
    if (novosItens[index].quantidade > 0) {
      novosItens[index].quantidade -= 1;
      setItens(novosItens);
    }
  };

  // Função para prosseguir para a tela de pagamento
  const handleCheckout = () => {
    const itensSelecionados = itens.filter(item => item.selecionado && item.quantidade > 0);
    if (itensSelecionados.length > 0) {
      // Passar os itens selecionados para a próxima tela de pagamento
      console.log('Itens selecionados:', itensSelecionados);
      navigate('/pagamento', { state: { itensSelecionados } });
    } else {
      alert('Por favor, selecione ao menos um item.');
    }
  };

  return (
    <div className="compras-container">
      <h2>Iniciar Compras</h2>
      <div className="itens-lista">
        {itens.map((item, index) => (
          <div key={item.id} className="item">
            <input
              type="checkbox"
              checked={item.selecionado}
              onChange={() => handleSelectItem(index)}
            />
            <span>{item.nome} - R${item.preco}</span>
            <div className="quantidade-container">
              <button onClick={() => handleDecreaseQuantity(index)}>-</button>
              <span>{item.quantidade}</span>
              <button onClick={() => handleIncreaseQuantity(index)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <button className="checkout-button" onClick={handleCheckout}>
        Prosseguir para o Pagamento
      </button>
      <button onClick={() => navigate('/cliente_dashboard')}>Voltar</button>
    </div>
  );
}

export default IniciarCompras;
