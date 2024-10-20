class Produto {
  constructor(id = null, nome = '', descricao = '', preco = null, categoria = '', fabricado_em = '', estoque = null) {
      this.id = id;
      this.nome = nome;
      this.descricao = descricao;
      this.preco = preco;
      this.categoria = categoria;
      this.fabricado_em = fabricado_em;
      this.estoque = estoque;
  }

  getID() {
      return this.id;
  }
  getNome() {
      return this.nome;
  }
  getDescricao() {
      return this.descricao;
  }
  getPreco() {
      return this.preco;
  }
  getCategoria() {
      return this.categoria;
  }
  getFabricadoEm() {
      return this.fabricado_em;
  }
  getEstoque() {
      return this.estoque;
  }

  setID(i) {
      this.id = i;
  }
  setNome(n) {
      this.nome = n;
  }
  setDescricao(d) {
      this.descricao = d;
  }
  setPreco(p) {
      this.preco = p;
  }
  setCategoria(c) {
      this.categoria = c;
  }
  setFabricadoEm(f) {
      this.fabricado_em = f;
  }
  setEstoque(e) {
      this.estoque = e;
  }
}

module.exports = Produto;
