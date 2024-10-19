class Produto {
  constructor(produto_id = null, nome = '', descricao = '', preco = null, categoria = '', fabricado_em = '', estoque = null) {
      this.produto_id = produto_id;
      this.nome = nome;
      this.descricao = descricao;
      this.preco = preco;
      this.categoria = categoria;
      this.fabricado_em = fabricado_em;
      this.estoque = estoque;
  }

  getID() {
      return this.produto_id;
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
      this.produto_id = i;
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
