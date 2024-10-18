"use client";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Modal from "./modal";
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {
  const [produtos, setProdutos] = useState([]); // Inicializa como um array vazio
  const [showModal, setShowModal] = useState(false);

  const handleResult = (produtoNovo) => {
    setProdutos((prevProdutos) => [...prevProdutos, produtoNovo]); // Adiciona o novo produto ao array existente
    setShowModal(false); // Fecha o modal após a inserção
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const deletar = (produtoEscolhido) => {
    setProdutos(produtos.filter(produto => produto !== produtoEscolhido)); //essa função filter delvolve um array dos produtos sem o produto escolhido para deleção
  };

  return (
    <>
      <div className="container-main">
        
  
        <div className="container-cruds">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleOpenModal}
          >
            + Adicionar novo produto
          </button>
    
          <div className="pesquisa_nome">
            <p>Pesquisar por nome</p>
            <input type="text" placeholder="Insira o nome"/>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z"/></svg>
          </div>
    
        </div>
        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            handleResult={handleResult}
          />
        )}
  
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length > 0 ? ( // Verifica se há produtos
              produtos.map((produto, index) => ( // Mapeia os produtos para exibição
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{produto.nome_produto}</td>
                  <td>{produto.preco}</td>
                  <td>{produto.quantidade}</td>
                  <td>
                    <button onClick={() => deletar(produto)} type="button" className="btn-delete">
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum produto adicionado ainda.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
