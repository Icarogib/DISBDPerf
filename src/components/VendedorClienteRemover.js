import React, { useState } from 'react';
import '../App.css'; // Se houver um estilo comum para a aplicação, importe aqui
import { useNavigate } from 'react-router-dom';

function RemoverCliente() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState('');
  const [clienteEncontrado, setClienteEncontrado] = useState(null);
  const [mensagem, setMensagem] = useState('');

  // Função para buscar o cliente pelo CPF (aqui deve ser feita a integração com o backend)
  const handleBuscarCliente = () => {
    // Simulação de busca de cliente
    const clienteExemplo = {
      nome: 'João da Silva',
      cpf: '123.456.789-00',
      email: 'joao.silva@email.com',
      telefone: '(11) 98765-4321',
    };

    if (cpf === '123.456.789-00') {
      setClienteEncontrado(clienteExemplo);
      setMensagem('');
    } else {
      setClienteEncontrado(null);
      setMensagem('Cliente não encontrado.');
    }
  };

  // Função para remover o cliente (aqui deve ser feita a integração com o backend)
  const handleRemoverCliente = () => {
    if (clienteEncontrado) {
      // Aqui você chamaria o backend para remover o cliente
      setMensagem(`Cliente ${clienteEncontrado.nome} foi removido com sucesso.`);
      setClienteEncontrado(null); // Limpa a informação do cliente após remover
      setCpf(''); // Limpa o campo de CPF
    }
  };

  return (
    <div className="remover-cliente-container">
      <h2>Remover Cliente</h2>
      <div className="buscar-cpf-container">
        <label htmlFor="cpf">Digite o CPF do cliente:</label>
        <input
          type="text"
          id="cpf"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="123.456.789-00"
        />
        <button onClick={handleBuscarCliente}>Buscar Cliente</button>
      </div>

      {/* Exibe os dados do cliente encontrado */}
      {clienteEncontrado && (
        <div className="dados-cliente-encontrado">
          <p><strong>Nome:</strong> {clienteEncontrado.nome}</p>
          <p><strong>CPF:</strong> {clienteEncontrado.cpf}</p>
          <p><strong>Email:</strong> {clienteEncontrado.email}</p>
          <p><strong>Telefone:</strong> {clienteEncontrado.telefone}</p>
          <button onClick={handleRemoverCliente}>Remover Cliente</button>
        </div>
      )}

      {/* Mensagem caso o cliente não seja encontrado ou após a remoção */}
      {mensagem && <p>{mensagem}</p>}
      <button onClick={() => navigate('/gerenciar_cliente')}>Voltar</button>
    </div>
  );
}

export default RemoverCliente;
