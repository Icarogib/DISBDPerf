const express = require('express');
const bodyParser = require('body-parser');
const CRUD = require('./CRUD');
const Cliente = require('./cliente');
const Produto = require('./Produto');
const Venda = require('./Venda');
const mysql = require('mysql2');

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

// Rotas CRUD para Clientes
app.get('/clientes', (req, res) => {
  const crud = new CRUD(connection);
  crud.listar('clientes', (clientes) => {
    res.json(clientes);
  });
});

app.post('/clientes', (req, res) => {
  const crud = new CRUD(connection);
  const { nome, endereco, telefone } = req.body;
  const cliente = new Cliente(null, nome, endereco, telefone);
  crud.inserir('clientes', cliente, (result) => {
    res.json({ message: 'Cliente inserido com sucesso', id: result.insertId });
  });
});

app.put('/clientes/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  const { nome, endereco, telefone } = req.body;
  const clienteAtualizado = new Cliente(id, nome, endereco, telefone);
  crud.atualizar('clientes', id, clienteAtualizado, () => {
    res.json({ message: 'Cliente atualizado com sucesso' });
  });
});

app.delete('/clientes/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  crud.deletar('clientes', id, () => {
    res.json({ message: 'Cliente removido com sucesso' });
  });
});

// Rotas CRUD para Estoque
app.get('/estoque', (req, res) => {
  const crud = new CRUD(connection);
  crud.listar('estoque', (produtos) => {
    res.json(produtos);
  });
});

app.post('/estoque', (req, res) => {
  const crud = new CRUD(connection);
  const { nome_produto, preco, quantidade } = req.body;
  const produto = new Produto(null, nome_produto, parseFloat(preco), parseInt(quantidade));
  crud.inserir('estoque', produto, (result) => {
    res.json({ message: 'Produto inserido com sucesso', id: result.insertId });
  });
});

app.put('/estoque/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  const { nome_produto, preco, quantidade } = req.body;
  const produtoAtualizado = new Produto(id, nome_produto, parseFloat(preco), parseInt(quantidade));
  crud.atualizar('estoque', id, produtoAtualizado, () => {
    res.json({ message: 'Produto atualizado com sucesso' });
  });
});

app.delete('/estoque/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  crud.deletar('estoque', id, () => {
    res.json({ message: 'Produto removido com sucesso' });
  });
});

// Rotas para Relatórios (Clientes, Estoque e Vendas)
app.get('/relatorios/clientes', (req, res) => {
  const sql = `
    SELECT clientes.id, clientes.nome, COALESCE(SUM(vendas.quantidade_vendida * estoque.preco), 0) AS totalComprado
    FROM clientes
    LEFT JOIN vendas ON clientes.id = vendas.cliente_id
    LEFT JOIN estoque ON vendas.produto_id = estoque.id
    GROUP BY clientes.id`;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/relatorios/estoque', (req, res) => {
  const sql = `SELECT estoque.id, estoque.nome_produto, estoque.preco, estoque.quantidade,
               (estoque.quantidade - IFNULL(SUM(vendas.quantidade_vendida), 0)) AS quantidade_restante
               FROM estoque
               LEFT JOIN vendas ON estoque.id = vendas.produto_id
               GROUP BY estoque.id, estoque.nome_produto, estoque.preco, estoque.quantidade`;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/relatorios/vendas', (req, res) => {
  const sqlVendas = `
    SELECT vendas.id, clientes.nome AS cliente, estoque.nome_produto AS produto, vendas.quantidade_vendida, (vendas.quantidade_vendida * estoque.preco) AS valor_total
    FROM vendas
    JOIN clientes ON vendas.cliente_id = clientes.id
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
