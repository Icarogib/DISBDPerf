class Forma_pagamento{
    constructor( id = '', status_pagamento = '', descricao = '', ) {  
      this.id = id;
      this.status_pagamento = status_pagamento;
      this.descricao = descricao;
  }

  getID(){
    return this.id;
  }
  getStatus(){
    return this.status_pagamento;
  }
  getDescricao(){
    return this.descricao;
  }

  setID(i){
    this.id = i;
  }
  setprodutoID(v){
    this.status_pagamento = v;
  }
  setDescricao(d){
    this.descricao = d;
  }
}

module.exports = Forma_pagamento;