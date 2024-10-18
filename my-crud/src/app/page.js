"use client";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Modal from "./modal";

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

  return (
    <>
      <h1>Meu CRUD</h1>

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleOpenModal}
      >
        + Adicionar novo produto
      </button>

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
          </tr>
        </thead>
        <tbody>
          {produtos.length > 0 ? ( // Verifica se há produtos
            produtos.map((produto, index) => ( // Mapeia os produtos para exibição
              <tr key={index}>
                <td>{produto.id}</td>
                <td>{produto.nome_produto}</td>
                <td>{produto.preco}</td>
                <td>{produto.quantidade}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum produto adicionado ainda.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
