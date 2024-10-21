class Pagamento{
    constructor( id = null, venda_id = '', forma_pagamento_id = '', data_pagamento = '',  status_pagamento = '' ) {  
    this.id = id;
    this.venda_id = venda_id;
    this.forma_pagamento_id = forma_pagamento_id;
    this.data_pagamento = data_pagamento;
    this.status_pagamento = status_pagamento;
    }

    getID(){
        return this.id;
    }
    getVendaID(){
        return this.venda_id;
    }
    getFPagID(){
        return this.forma_pagamento_id;
    }
    getDataPag(){
        return this.data_pagamento;
    }
    getStatus(){
      return this.status_pagamento;
    }

    setID(){
        this.id = id;
    }
    setVendaID(){
        this.venda_id = venda_id;
    }
    setFPagID(){
        this.forma_pagamento_id = forma_pagamento_id;
    }
    setDataPag(){
        this.data_pagamento = data_pagamento;
    }
    setStatus(){
        this.status_pagamento = status_pagamento;
    }
}

module.exports = Pagamento;