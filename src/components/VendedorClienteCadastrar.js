import React, { useState } from 'react';
import axios from 'axios'; // Importando Axios para realizar requisições HTTP
import '../App.css';
import { useNavigate } from 'react-router-dom';

function CadastrarClientes() {
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
  const handleSalvar = async () => {
    try {
      // Fazendo a requisição POST para salvar os dados do cliente no backend
      const response = await axios.post('https://api.exemplo.com/clientes', dadosCliente); // Ajuste a URL para o seu backend
      console.log('Dados salvos com sucesso:', response.data);

      setEditando(false);
      alert('Dados atualizados com sucesso!');
      navigate('/dados_pessoais');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      alert('Ocorreu um erro ao salvar os dados. Tente novamente.');
    }
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
