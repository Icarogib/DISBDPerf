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
      <h1>Salsichas's Perfumaria</h1>
      
      {/* Botões adicionais */}
      <div className='Nomes'>
      <div className="button_clientes">
      <button onClick={() => navigate('/gerenciar_cliente')}>Gerenciar Clientes</button>
        <button onClick={() => navigate('/gerenciar_estoque')}>Gerenciar Estoque</button>
        <button onClick={() => navigate('/autorizar_pedido')}>Gerenciar Pedidos</button>
        <button onClick={() => navigate('/')}>Sair</button>
        </div>
      </div>
    </div>
  );
}

export default AppHomeCliente;
