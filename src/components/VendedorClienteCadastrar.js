import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function CadastrarClientes() {
  // Estado inicial com os dados do cliente (esses dados poderiam ser carregados de um backend)
  const [dadosCliente, setDadosCliente] = useState({
    nome: 'João da Silva',
    cpf: '123.456.789-00',
    email: 'joao.silva@email.com',
    telefone: '(11) 98765-4321',
    endereco: 'Rua Exemplo, 123',
    timeTorce: 'São Paulo FC',
    cidade: 'São Paulo',
    onePieceFan: 'Sim',
  });

  const [editando, setEditando] = useState(true); // Estado para saber se o usuário está em modo de edição

  const navigate = useNavigate();

  // Função para salvar as alterações
  const handleSalvar = () => {
    // Aqui você pode adicionar a lógica para salvar os dados (no backend, por exemplo)
    setEditando(false);
    alert('Dados atualizados com sucesso!');
    navigate('/dados_pessoais')
  };

  // Função para lidar com mudanças nos campos de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosCliente({
      ...dadosCliente,
      [name]: value,
    });
  };

  return (
    <div className="dados-pessoais-container">
      <div className="dados-pessoais">
        <div className="ttDP"><h2>Cadastro Cliente</h2></div>
        <div className="dados">
          <p><strong>Nome:</strong> 
            {editando ? (
              <input type="text" name="nome" value={dadosCliente.nome} onChange={handleChange} />
            ) : (
              dadosCliente.nome
            )}
          </p>
          <p><strong>CPF:</strong> 
            {editando ? (
              <input type="text" name="cpf" value={dadosCliente.cpf} onChange={handleChange} />
            ) : (
              dadosCliente.cpf
            )}
          </p>
          <p><strong>Email:</strong> 
            {editando ? (
              <input type="email" name="email" value={dadosCliente.email} onChange={handleChange} />
            ) : (
              dadosCliente.email
            )}
          </p>
          <p><strong>Telefone:</strong> 
            {editando ? (
              <input type="text" name="telefone" value={dadosCliente.telefone} onChange={handleChange} />
            ) : (
              dadosCliente.telefone
            )}
          </p>
          <p><strong>Endereço:</strong> 
            {editando ? (
              <input type="text" name="endereco" value={dadosCliente.endereco} onChange={handleChange} />
            ) : (
              dadosCliente.endereco
            )}
          </p>
          <p><strong>Time que Torce:</strong> 
            {editando ? (
              <input type="text" name="timeTorce" value={dadosCliente.timeTorce} onChange={handleChange} />
            ) : (
              dadosCliente.timeTorce
            )}
          </p>
          <p><strong>Cidade:</strong> 
            {editando ? (
              <input type="text" name="cidade" value={dadosCliente.cidade} onChange={handleChange} />
            ) : (
              dadosCliente.cidade
            )}
          </p>
          <p><strong>OnePieceFan:</strong> 
            {editando ? (
              <input type="text" name="onePieceFan" value={dadosCliente.onePieceFan} onChange={handleChange} />
            ) : (
              dadosCliente.onePieceFan
            )}
          </p>
        </div>

        <button className="att-button" onClick={handleSalvar}>Salvar Dados</button>

        <button onClick={() => navigate('/gerenciar_cliente')}>Voltar</button>
      </div>
    </div>
  );
}

export default CadastrarClientes;