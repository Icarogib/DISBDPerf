import React, { useState } from 'react';
import '../App.css'; // Estilo comum da aplicação
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Adicionar Axios para as requisições

function RemoverCliente() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState('');
  const [clienteEncontrado, setClienteEncontrado] = useState(null);
  const [mensagem, setMensagem] = useState('');

  // Função para buscar o cliente pelo CPF
  const handleBuscarCliente = () => {
    axios
      .get(`http://localhost:3001/cliente/${cpf}`) // Substituir pela URL correta do backend
      .then((response) => {
        setClienteEncontrado(response.data.cliente); // Armazena o cliente retornado
        setMensagem('');
      })
      .catch((error) => {
        console.error('Erro ao buscar cliente:', error);
        setClienteEncontrado(null);
        setMensagem('Cliente não encontrado.');
      });
  };

  // Função para remover o cliente
  const handleRemoverCliente = () => {
    if (clienteEncontrado) {
      axios
        .delete(`http://localhost:3001/cliente/${clienteEncontrado.id}`) // Substituir pela URL correta do backend
        .then(() => {
          setMensagem(`Cliente ${clienteEncontrado.nome} foi removido com sucesso.`);
          setClienteEncontrado(null); // Limpa a informação do cliente após remover
          setCpf(''); // Limpa o campo de CPF
        })
        .catch((error) => {
          console.error('Erro ao remover cliente:', error);
          setMensagem('Erro ao remover o cliente.');
        });
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
