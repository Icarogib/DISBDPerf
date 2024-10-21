class Item_Venda{
    constructor(id = null, venda_id = '', produto_id = '', quantidade = '', preco_unitario = '') {
      this.id = id;
      this.venda_id = venda_id;
      this.produto_id = produto_id;
      this.quantidade = quantidade;
      this.preco_unitario = preco_unitario;
  }

  getID(){
    return this.id;
  }
  getvendaID(){
    return this.venda_id;
  }
  getproduto(){
    return this.produto_id;
  }
  getQuant(){
    return this.quantidade;
  }
  getPrecoUnit(){
    return this.preco_unitario;
  }

  setID(i){
    this.id = i;
  }
  setvendaID(c){
    this.venda_id = c;
  }
  setprodutoID(v){
    this.produto_id = v;
  }
  setQuant(d){
    this.quantidade = d;
  }
  setPrecoUnit(t){
    this.preco_unitario = t;
  }
}

module.exports = Item_Venda;