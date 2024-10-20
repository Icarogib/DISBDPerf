import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function DadosPessoais() {
  // Estado inicial com os dados do cliente (esses dados poderiam ser carregados de um backend)
  const [dadosCliente] = useState({
    nome: 'João da Silva',
    cpf: '123.456.789-00',
    email: 'joao.silva@email.com',
    telefone: '(11) 98765-4321',
    endereco: 'Rua Exemplo, 123',
    timeTorce: 'São Paulo FC',
    cidade: 'São Paulo',
    onePieceFan: 'Sim',
  });
  const navigate = useNavigate();
  // Função que será chamada quando o botão de atualização for clicado
  const handleAtualizar = () => {
    // Aqui você pode adicionar a lógica para permitir que o cliente atualize os dados
    alert('Você será redirecionado para atualizar seus dados.');
    navigate('/changeData')
  };

  return (
    <div className="dados-pessoais-container">
      <div className="dados-pessoais">
        <div className='ttDP'><h2>Dados Pessoais</h2></div>
          <div className='dados'><p><strong>Nome:</strong> {dadosCliente.nome}</p>
            <p><strong>CPF:</strong> {dadosCliente.cpf}</p>
            <p><strong>Email:</strong> {dadosCliente.email}</p>
            <p><strong>Telefone:</strong> {dadosCliente.telefone}</p>
            <p><strong>Endereço:</strong> {dadosCliente.endereco}</p>
            <p><strong>Time que Torce:</strong> {dadosCliente.timeTorce}</p>
            <p><strong>Cidade:</strong> {dadosCliente.cidade}</p>
            <p><strong>OnePieceFan:</strong> {dadosCliente.onePieceFan}</p>
          </div>
          <button className="att-button" onClick={handleAtualizar}>
            Atualizar Dados
           </button>
           <button onClick={() => navigate('/cliente_dashboard')}>Sair</button>
      </div>
     
    </div>
  );
}

export default DadosPessoais;