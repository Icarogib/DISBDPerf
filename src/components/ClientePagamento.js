import React, { useState } from 'react';
import axios from 'axios'; // Importa Axios
import { useLocation, useNavigate } from 'react-router-dom';

function Pagamento() {
  const location = useLocation();
  const navigate = useNavigate();
  const { itensSelecionados } = location.state || { itensSelecionados: [] };

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

    const dadosCompra = {
      itens: itensSelecionados,
      total: calcularTotal(),
      formaPagamento,
    };

    try {
      // Enviar dados da compra para o backend
      await axios.post('https://api.exemplo.com/checkout', dadosCompra); // Ajuste o endpoint
      alert(`Compra finalizada com sucesso usando ${formaPagamento}!`);
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
          <option value="boleto">Boleto</option>
          <option value="cartao_debito">Cartão de Débito</option>
          <option value="cartao_credito">Cartão de Crédito</option>
          <option value="pix">Pix</option>
          <option value="berries">Berries</option>
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
