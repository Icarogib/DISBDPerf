class Produto{
    constructor(id = null, nome_produto = '', preco = null, quantidade = null) {
      this.id = id;
      this.nome_produto = nome_produto;
      this.preco = preco;
      this.quantidade = quantidade;
    }

    getID(){
      return this.id;
    }
    getNomeProduto(){
      return this.nome_produto;
    }
    getPreco(){
      return this.preco;
    }
    getQuantidade(){
      return this.quantidade;
    }

    setID(i){
      this.id = i;
    }
    setNomeProduto(n){
      this.nome_produto = n;
    }
    setPreco(p){
      this.preco = p;
    }
    setQuantidade(q){
      this.quantidade = q;
    }
  }

  module.exports = Produto;