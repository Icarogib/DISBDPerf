import { useState } from "react";
import Produto from "../../../Produto";

export default function Modal({ handleResult, onClose }) {
  const [nomeProduto, setNomeProduto] = useState('');
  const [preco, setPreco] = useState(0);
  const [quantidade, setQuantidade] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const produtoNovo = new Produto(null, nomeProduto, preco, quantidade);
    handleResult(produtoNovo); 
    onClose();                 
  };

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Adicionar Produto</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome do produto"
                onChange={(e) => setNomeProduto(e.target.value)}
                value={nomeProduto}
                className="form-control mb-3"
              />
              <input
                type="number"
                placeholder="Preço"
                step="any"
                onChange={(e) => setPreco(parseFloat(e.target.value))}
                value={preco}
                className="form-control mb-3"
              />
              <input
                type="number"
                placeholder="Quantidade"
                onChange={(e) => setQuantidade(parseInt(e.target.value))}
                value={quantidade}
                className="form-control mb-3"
              />
              <button type="submit" className="btn btn-primary">
                Inserir
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
