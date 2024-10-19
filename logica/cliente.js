class Cliente{
    constructor(id = null, nome = '', endereco = '', telefone = null) {
      this.id = id;
      this.nome = nome;
      this.endereco = endereco;
      this.telefone = telefone;
    }

    getID(){
      return this.id;
    }
    getNome(){
      return this.nome;
    }
    getEndereco(){
      return this.endereco;
    }
    getTelefone(){
      return this.telefone;
    }

    setID(i){
      this.id = i;
    }
    setNome(n){
      this.nome = n;
    }
    setEndereco(e){
      this.endereco = e;
    }
    setTelefone(t){
      this.telefone = t;
    }

  }

module.exports = Cliente;