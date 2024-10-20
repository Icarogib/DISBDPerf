class Venda{
    constructor(id = null, cliente_id = '', vendedor_id = '', data_venda = '', total_venda = '') {
      this.id = id;
      this.cliente_id = cliente_id;
      this.vendedor_id = vendedor_id;
      this.data_venda = data_venda;
      this.total_venda = total_venda;
  }

  getID(){
    return this.id;
  }
  getClienteID(){
    return this.cliente_id;
  }
  getVendedor(){
    return this.vendedor_id;
  }
  getData(){
    return this.data_venda;
  }
  getTotal(){
    return this.total_venda;
  }

  setID(i){
    this.id = i;
  }
  setClienteID(c){
    this.cliente_id = c;
  }
  setVendedorID(v){
    this.vendedor_id = v;
  }
  setData(d){
    this.data_venda = d;
  }
  setTotal(t){
    this.total_venda = t;
  }
}

module.exports = Venda;