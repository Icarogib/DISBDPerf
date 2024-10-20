const express = require('express');
const bodyParser = require('body-parser');
const CRUD = require('./CRUD');
const Cliente = require('./cliente');
const Produto = require('./Produto');
const Venda = require('./Venda');
const mysql = require('mysql2');
const cors = require('cors')

const corsOption = {
    origin: ['http://127.0.0.1:5500', 'http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Fui123!',
  database: 'dbperfumasicha'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados.');
});

const app = express();
app.use(bodyParser.json()); // Middleware para processar JSON no corpo das requisições


app.use(cors(corsOption));


// Rotas CRUD para cliente
app.get('/cliente', (req, res) => {
  const crud = new CRUD(connection);
  crud.listar('cliente', (cliente) => {
    res.json(cliente);
  });
});

app.post('/cliente', (req, res) => {
  const crud = new CRUD(connection);
  const { nome, cpf, email, endereco, cidade, telefone, torce_fla  } = req.body;
  const cliente = new Cliente(null, nome, cpf, email, endereco, cidade, telefone, torce_fla );
  crud.inserir('cliente', cliente, (result) => {
    res.json({ message: 'Cliente inserido com sucesso', id: result.insertId });
  });
});

app.put('/cliente/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  const { nome, cpf, email, endereco, cidade, telefone, torce_fla } = req.body;
  const clienteAtualizado = new Cliente(id, nome, cpf, email, endereco, cidade, telefone, torce_fla);
  crud.atualizar('cliente', id, clienteAtualizado, (result) => {
    if(result.affectedRows == 0)
        res.json({ message: 'Cliente não encontrado' });
    else
        res.json({ message: 'Cliente atualizado com sucesso' });
  });
});

app.delete('/cliente/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  crud.deletar('cliente', id, (result) => {
    if(result.affectedRows == 0)
        res.json({ message: 'Cliente não encontrado' });
    else
        res.json({ message: 'Cliente removido com sucesso' });
  });
});

// Rotas CRUD para vendedor
app.get('/vendedor', (req, res) => {
  const crud = new CRUD(connection);
  crud.listar('vendedor', (vendedor) => {
    res.json(vendedor);
  });
});

app.post('/vendedor', (req, res) => {
  const crud = new CRUD(connection);
  const { nome, cpf, email, telefone } = req.body;
  const vendedor = new vendedor(null, nome, cpf, email, telefone );
  crud.inserir('vendedor', vendedor, (result) => {
    res.json({ message: 'Vendedor inserido com sucesso', id: result.insertId });
  });
});

app.put('/vendedor/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  const { nome, cpf, email, telefone, } = req.body;
  const vendedorAtualizado = new vendedor(id, nome, cpf, email, telefone );
  crud.atualizar('vendedor', id, vendedorAtualizado, (result) => {
    if(result.affectedRows == 0)
        res.json({ message: 'Vendedor não encontrado' });
    else
        res.json({ message: 'Vendedor atualizado com sucesso' });
  });
});

app.delete('/vendedor/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  crud.deletar('vendedor', id, (result) => {
    if(result.affectedRows == 0)
        res.json({ message: 'Vendedor não encontrado' });
    else
        res.json({ message: 'Vendedor removido com sucesso' });
  });
});

// Rotas CRUD para Estoque
app.get('/produto', (req, res) => {
  const crud = new CRUD(connection);
  crud.listar('produto', (produtos) => {
    if (produtos == null)
        console.log("Nao há produtos.");
    else
        console.log(produtos);
    res.json(produtos);
  });
});

app.post('/produto', (req, res) => {
  const crud = new CRUD(connection);
  const { nome, descricao, preco, categoria, fabricado_em, estoque } = req.body;
  const produto = new Produto(null, nome, descricao, parseFloat(preco), categoria, fabricado_em, parseInt(estoque));
  crud.inserir('produto', produto, (result) => {
    res.json({ message: 'Produto inserido com sucesso', id: result.insertId });
  });
});

app.put('/produto/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  const { nome, descricao, preco, categoria, fabricado_em, estoque } = req.body;
  const produtoAtualizado = new Produto(id, nome, descricao, parseFloat(preco), categoria, fabricado_em, parseInt(estoque));
  crud.atualizar('produto', id, produtoAtualizado, (result) => {
    if(result.affectedRows == 0)
        res.json({ message: 'Produto não encontrado' });
    else
        res.json({ message: 'Produto atualizado com sucesso' });
  });
});

app.delete('/produto/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  crud.deletar('produto', id, (result) => {
    if(result.affectedRows == 0)
        res.json({ message: 'Produto não encontrado' });
    else
    res.json({ message: 'Produto removido com sucesso' });
  });
});

// Rotas para Relatórios (cliente, Estoque e Vendas)
app.get('/relatorios/cliente', (req, res) => {
  const sql = `
    SELECT cliente.id, cliente.nome, COALESCE(SUM(vendas.quantidade_vendida * estoque.preco), 0) AS totalComprado
    FROM cliente
    LEFT JOIN vendas ON cliente.id = vendas.cliente_id
    LEFT JOIN estoque ON vendas.produto_id = estoque.id
    GROUP BY cliente.id`;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/relatorios/produto', (req, res) => {
  const sql = `SELECT produto.id, produto.nome, produto.preco, produto.estoque,
               (produto.estoque - IFNULL(SUM(vendas.quantidade_vendida), 0)) AS quantidade_restante
               FROM produto
               LEFT JOIN vendas ON produto.id = vendas.produto_id
               GROUP BY produto.id, produto.nome_produto, produto.preco, produto.quantidade`;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/relatorios/vendas', (req, res) => {
  const sqlVendas = `
    SELECT vendas.id, cliente.nome AS cliente, estoque.nome_produto AS produto, vendas.quantidade_vendida, (vendas.quantidade_vendida * estoque.preco) AS valor_total
    FROM vendas
    JOIN cliente ON vendas.cliente_id = cliente.id
    JOIN estoque ON vendas.produto_id = estoque.id`;

  connection.query(sqlVendas, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Iniciar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
