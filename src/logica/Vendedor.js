class Vendedor {
  constructor(id = null, nome = '', cpf = null, email = '', telefone = '') {
      this.id = id;
      this.nome = nome;
      this.cpf = cpf;
      this.email = email;
      this.telefone = telefone;

  }

  getID() {
      return this.id;
  }
  getNome() {
      return this.nome;
  }
  getCpf() {
      return this.cpf;
  }
  getEmail() {
      return this.email;
  }
  getTelefone() {
      return this.telefone;
  }


  setID(i) {
      this.id = i;
  }
  setNome(n) {
      this.nome = n;
  }
  setCpf(c) {
      this.cpf = c;
  }
  setEmail(e) {
      this.email = e;
  }
  setTelefone(t) {
      this.telefone = t;
  }
}

module.exports = Vendedor;
