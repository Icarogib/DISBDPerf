import React, { useState, useEffect } from 'react';
import '../App.css'; // Estilo comum da aplicação
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Adicionar Axios para fazer a requisição

function ListarClientes() {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(''); // Para armazenar erros de requisição
  const navigate = useNavigate();

  // Requisição para buscar os clientes do backend
  useEffect(() => {
    axios.get('http://localhost:5000/clientes') // Alterar para o endpoint correto da API
      .then((response) => {
        setClientes(response.data); // Armazena a resposta da API
      })
      .catch((error) => {
        console.error('Erro ao buscar clientes:', error);
        setError('Erro ao carregar clientes.'); // Exibe uma mensagem de erro
      });
  }, []);

  return (
    <div className="listar-clientes-container">
      <h2>Clientes Cadastrados</h2>
      {error && <p>{error}</p>} {/* Exibe a mensagem de erro, se houver */}
      {clientes.length > 0 ? (
        <table className="tabela-clientes">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Cidade</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.cidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum cliente cadastrado.</p>
      )}
      <button onClick={() => navigate('/gerenciar_cliente')}>Voltar</button>
    </div>
  );
}

export default ListarClientes;
