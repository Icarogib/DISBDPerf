import React, { useState } from 'react';
import axios from 'axios'; // Importa Axios
import { useLocation, useNavigate } from 'react-router-dom';

function Pagamento() {
  const location = useLocation();
  const navigate = useNavigate();
  const { itensSelecionados } = location.state || { itensSelecionados: [] };
  const venda_id = localStorage.getItem('vendaId');

  const [formaPagamento, setFormaPagamento] = useState('');

  // Calcular o total
  const calcularTotal = () => {
    return itensSelecionados.reduce((total, item) => total + item.preco * item.quantidade, 0);
  };

  // Função para finalizar o pagamento
  const handleFinalizarCompra = async () => {
    if (!formaPagamento) {
      alert('Por favor, selecione uma forma de pagamento.');
      return;
    }
    const data_pag = new Date().toISOString().slice(0, 10); // Data no formato YYYY-MM-DD
    const status = 'aguardando';

    const dadosCompra = {
      venda_id,
      forma_pagamento_id: formaPagamento,
      data_pag,
      status
    };

    try {
      // Enviar dados da compra para o backend
      await axios.post('http://localhost:3001/pagamento', dadosCompra); // Ajuste o endpoint
      alert(`Compra finalizada com sucesso!`);
      navigate('/cliente_dashboard'); // Redireciona de volta à página inicial após a compra
    } catch (error) {
      console.error('Erro ao finalizar a compra:', error);
      alert('Ocorreu um erro ao finalizar a compra. Tente novamente.');
    }
  };

  return (
    <div className="pagamento-container">
      <h2>Pagamento</h2>
      <div className="itens-selecionados">
        {itensSelecionados.map((item) => (
          <div key={item.id} className="item">
            <span>{item.nome}</span>
            <span> Quantidade: {item.quantidade} </span>
            <span> Preço Unitário: R${item.preco} </span>
            <span> Total: R${item.preco * item.quantidade}</span>
          </div>
        ))}
      </div>

      <h3>Total: R${calcularTotal()}</h3>

      {/* Campo para selecionar a forma de pagamento */}
      <div className="forma-pagamento">
        <h3>Selecione a Forma de Pagamento</h3>
        <select value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)}>
          <option value="">Selecione</option>
          <option value="1">Boleto</option>
          <option value="2">Cartão de Débito</option>
          <option value="3">Cartão de Crédito</option>
          <option value="4">Pix</option>
          <option value="5">Berries</option>
        </select>
      </div>

      <button className="finalizar-compra-button" onClick={handleFinalizarCompra}>
        Finalizar Compra
      </button>
      <button onClick={() => navigate('/iniciar_compras')}>Voltar</button>
    </div>
  );
}

export default Pagamento;
