class Venda{
    constructor(id = null, cliente_id = null, produto_id = null, quantidade_vendida = null) {
      this.id = id;
      this.cliente_id = cliente_id;
      this.produto_id = produto_id;
      this.quantidade_vendida = quantidade_vendida;
  }

  getID(){
    return this.id;
  }
  getClienteID(){
    return this.cliente_id;
  }
  getProdutoID(){
    return this.produto_id;
  }
  getQuantidade(){
    return this.quantidade_vendida;
  }

  setID(i){
    this.id = i;
  }
  setClienteID(c){
    this.cliente_id = c;
  }
  setProdutoID(p){
    this.produto_id = p;
  }
  setQuantidade(q){
    this.quantidade_vendida = q;
  }
}

module.exports = Venda;