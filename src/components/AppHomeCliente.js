import React, { useState } from 'react'; // Adicione useState aqui
import '../App.css';
import { useNavigate } from 'react-router-dom';

function AppHomeCliente() {
  const lixo = "Buceta";
  const navigate = useNavigate();
  const [nomeCliente] = useState(lixo); // Altere 'João' para o nome real do cliente
  return (
    <div className="container">
      <div>
      <div><h2>Bem-vindo, Cliente {nomeCliente}</h2></div> {/* Mensagem de boas-vindas */}
      <div className='ttPrincipal'><h1>Salsichas's Perfum</h1></div>
      <div className="catalog-container">
        <h2>Catálogo de Itens</h2>
        {/* Aqui você pode adicionar itens do catálogo quando estiver pronto */}
      </div>
      </div>
      {/* Botões adicionais */}
      <div className="button_clientes">
        <button onClick={() => navigate('/iniciar_compras')}>Iniciar Compras</button>
        <button onClick={() => navigate('/dados_pessoais')}>Ver Dados Pessoais</button>
        <button onClick={() => navigate('/pedidos')}>Ver Pedidos Feitos</button>
        <button onClick={() => navigate('/sair')}>Sair</button>
      </div>
    </div>
  );
}

export default AppHomeCliente;
