import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Pagamento() {
  const location = useLocation();
  const navigate = useNavigate();
  const { itensSelecionados } = location.state || { itensSelecionados: [] };

  // Estado para armazenar a forma de pagamento selecionada
  const [formaPagamento, setFormaPagamento] = useState('');

  // Calcular o total
  const calcularTotal = () => {
    return itensSelecionados.reduce((total, item) => total + item.preco * item.quantidade, 0);
  };

  // Função para finalizar o pagamento
  const handleFinalizarCompra = () => {
    if (!formaPagamento) {
      alert('Por favor, selecione uma forma de pagamento.');
      return;
    }

    // Aqui você pode adicionar a lógica de finalização da compra com base na forma de pagamento
    alert(`Compra finalizada com sucesso usando ${formaPagamento}!`);
    navigate('/cliente_dashboard'); // Redireciona de volta à página inicial após a compra
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
