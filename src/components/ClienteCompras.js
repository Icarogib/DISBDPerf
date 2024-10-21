import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa Axios
import '../App.css';
import { useNavigate } from 'react-router-dom';

function IniciarCompras() {
  const navigate = useNavigate();
  const [itens, setItens] = useState([]);
  const [vendedorId, setVendedorId] = useState(''); // Estado para armazenar o ID do vendedor
  const [vendedores, setVendedores] = useState([]); // Estado para armazenar a lista de vendedores

  // Carrega os itens de um backend quando o componente for montado
  useEffect(() => {
    const carregarItens = async () => {
      try {
        const response = await axios.get('http://localhost:3001/produto'); // Ajuste o endpoint
        // Inicializa a quantidade e selecionado
        const itensComEstado = response.data.map(item => ({
          ...item,
          quantidade: 0, // Inicializa a quantidade em 0
          selecionado: false, // Inicializa selecionado como false
        }));
        setItens(itensComEstado);
      } catch (error) {
        console.error('Erro ao carregar itens:', error);
      }
    };

    const carregarVendedores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vendedor'); // Ajuste o endpoint para obter vendedores
        setVendedores(response.data);
      } catch (error) {
        console.error('Erro ao carregar vendedores:', error);
      }
    };

    carregarItens();
    carregarVendedores();
  }, []);

  // Função para selecionar/desselecionar um item
  const handleSelectItem = (index) => {
    const novosItens = [...itens];
    novosItens[index].selecionado = !novosItens[index].selecionado;
    setItens(novosItens);
  };

  // Função para aumentar a quantidade de um item
  const handleIncreaseQuantity = (index) => {
    const novosItens = [...itens];
    novosItens[index].quantidade += 1;
    setItens(novosItens);
  };

  // Função para diminuir a quantidade de um item
  const handleDecreaseQuantity = (index) => {
    const novosItens = [...itens];
    if (novosItens[index].quantidade > 0) {
      novosItens[index].quantidade -= 1;
      setItens(novosItens);
    }
  };

  const handleCheckout = async () => {
    const itensSelecionados = itens.filter(item => item.selecionado && item.quantidade > 0);
    
    if (itensSelecionados.length > 0 && vendedorId) { // Verifica se o vendedor foi selecionado
      const cliente_id = localStorage.getItem('clienteID'); // Supondo que o ID do cliente esteja armazenado
      const data_venda = new Date().toISOString().slice(0, 10); // Data no formato YYYY-MM-DD
      const total_venda = itensSelecionados.reduce((acc, item) => acc + (item.preco * item.quantidade), 0).toFixed(2);
  
      try {
        const vendaid = await axios.post('http://localhost:3001/venda', {
          cliente_id,
          vendedor_id: vendedorId, // Usa o vendedor selecionado
          data_venda,
          total_venda,
        });
        //console.log(vendaid.data.id);
        localStorage.setItem('vendaId', vendaid.data.id);
        navigate('/pagamento', { state: { itensSelecionados } });
      } catch (error) {
        console.error('Erro ao criar venda:', error);
        alert('Erro ao criar venda. Tente novamente.');
      }
    } else {
      alert('Por favor, selecione ao menos um item e um vendedor.');
    }
  };

  return (
    <div className="compras-container">
      <h2>Iniciar Compras</h2>
      <div>
        <label htmlFor="vendedor-select">Selecione o Vendedor:</label>
        <select
          id="vendedor-select"
          value={vendedorId}
          onChange={(e) => setVendedorId(e.target.value)}
        >
          <option value="">Selecione um vendedor</option>
          {vendedores.map((vendedor) => (
            <option key={vendedor.id} value={vendedor.id}>
              {vendedor.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="itens-lista">
        {itens.map((item, index) => (
          <div key={item.id} className="item">
            <input
              type="checkbox"
              checked={item.selecionado}
              onChange={() => handleSelectItem(index)}
            />
            <span>{item.nome} - R${parseFloat(item.preco).toFixed(2)}</span>
            <div className="quantidade-container">
              <button onClick={() => handleDecreaseQuantity(index)}>-</button>
              <span>{item.quantidade}</span>
              <button onClick={() => handleIncreaseQuantity(index)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <button className="checkout-button" onClick={handleCheckout}>
        Prosseguir para o Pagamento
      </button>
      <button onClick={() => navigate('/cliente_dashboard')}>Voltar</button>
    </div>
  );
}

export default IniciarCompras;
