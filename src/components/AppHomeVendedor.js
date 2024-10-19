import React, { useState } from 'react'; // Adicione useState aqui
import '../App.css';
import { useNavigate } from 'react-router-dom';

function AppHomeCliente() {
  const lixo = "Escravo01";
  const navigate = useNavigate();
  const [nomeCliente] = useState(lixo);
  return (
    <div className="container">
      <h2>Bem-vindo, Vendedor {nomeCliente}</h2> {/* Mensagem de boas-vindas */}
      <h1>Salsichas's Perfum</h1>
      <div className="catalog-container">
        <h2>Catálogo de Itens</h2>
        {/* Aqui você pode adicionar itens do catálogo quando estiver pronto */}
      </div>
      {/* Botões adicionais */}
      <div className="button_clientes">
        <button onClick={() => navigate('/gerenciar_estoque')}>Gerenciar Estoque</button>
        <button onClick={() => navigate('/autorizar_pedido')}>Gerenciar Pedidos</button>
        <button onClick={() => navigate('/sair')}>Sair</button>
      </div>
    </div>
  );
}

export default AppHomeCliente;
