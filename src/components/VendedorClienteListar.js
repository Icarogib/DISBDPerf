import React, { useState, useEffect } from 'react';
import '../App.css'; // Se houver um estilo comum para a aplicação, importe aqui
import { useNavigate } from 'react-router-dom';

function ListarClientes() {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();
  // Simulação de busca de clientes do backend (você deverá substituir pela lógica real)
  useEffect(() => {
    const clientesExemplo = [
      {
        nome: 'João da Silva',
        cpf: '123.456.789-00',
        email: 'joao.silva@email.com',
        telefone: '(11) 98765-4321',
        cidade: 'São Paulo',
      },
      {
        nome: 'Maria Oliveira',
        cpf: '987.654.321-00',
        email: 'maria.oliveira@email.com',
        telefone: '(11) 92345-6789',
        cidade: 'Rio de Janeiro',
      },
      {
        nome: 'Pedro Santos',
        cpf: '555.666.777-88',
        email: 'pedro.santos@email.com',
        telefone: '(21) 99876-5432',
        cidade: 'Belo Horizonte',
      },
    ];

    setClientes(clientesExemplo);
  }, []);

  return (
    <div className="listar-clientes-container">
      <h2>Clientes Cadastrados</h2>
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
/*useEffect(() => {
  fetch('URL_DA_API')
    .then(response => response.json())
    .then(data => setClientes(data))
    .catch(error => console.error('Erro ao buscar clientes:', error));
}, []);*/

//Gptto passou isso pra mim, acho que vai servir pra integrar com o backend

export default ListarClientes;