import React, { useState } from 'react';
import axios from 'axios'; // Importando Axios para realizar requisições HTTP
import '../App.css';
import { useNavigate } from 'react-router-dom';

function CadastrarClientes() {
  // Inicializa dadosCliente com um objeto contendo as propriedades esperadas
  const [dadosCliente, setDadosCliente] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    torce_fla: false,
    onepiece: false,
  });

  const [editando, setEditando] = useState(true);
  const navigate = useNavigate();

  // Função para salvar os dados do cliente
  const handleSalvar = async () => {
    try {
      // Fazendo a requisição POST para salvar os dados do cliente no backend
      console.log(dadosCliente);
      const response = await axios.post('http://localhost:3001/cliente', dadosCliente); 
      console.log('Dados salvos com sucesso:', response.data);

      setEditando(false);
      alert('Dados atualizados com sucesso!');
      navigate('/vendedor_dashboard');
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
          <p><strong>Flamenguista?:</strong>
            <input
              type="checkbox"
              name="torce_fla"
              checked={dadosCliente.torce_fla}
              onChange={(e) => handleChange({ target: { name: 'torce_fla', value: e.target.checked } })}
            />
          </p>
          <p><strong>Cidade:</strong> 
            {editando ? (
              <input type="text" name="cidade" value={dadosCliente.cidade} onChange={handleChange} />
            ) : (
              dadosCliente.cidade
            )}
          </p>
          <p><strong>One Piece Fan:</strong>
            <input
              type="checkbox"
              name="onepiece"
              checked={dadosCliente.onepiece}
              onChange={(e) => handleChange({ target: { name: 'onepiece', value: e.target.checked } })}
            />
          </p>
        </div>

        <button className="att-button" onClick={handleSalvar}>Salvar Dados</button>

        <button onClick={() => navigate('/gerenciar_cliente')}>Voltar</button>
      </div>
    </div>
  );
}

export default CadastrarClientes;
