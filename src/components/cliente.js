class Cliente {
  constructor(id = null, nome = '', cpf = null, email = '', endereco = '', cidade = '', telefone = '', torce_fla = '') {
      this.id = id;
      this.nome = nome;
      this.cpf = cpf;
      this.email = email;
      this.endereco = endereco;
      this.cidade = cidade;
      this.telefone = telefone;
      this.torce_fla = torce_fla;
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
  getEndereco() {
      return this.endereco;
  }
  getCidade() {
      return this.cidade;
  }
  getTelefone() {
      return this.telefone;
  }
  getTorceFla() {
      return this.torce_fla;
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
  setEndereco(en) {
      this.endereco = en;
  }
  setCidade(ci) {
      this.cidade = ci;
  }
  setTelefone(t) {
      this.telefone = t;
  }
  setTorceFla(tf) {
      this.torce_fla = tf;
  }
}

module.exports = Cliente;
