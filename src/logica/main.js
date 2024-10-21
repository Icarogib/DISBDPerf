const cors = require('cors');
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const Forma_pagamento = require('./Forma_pagamento');
const Item_Venda = require('./Item_venda');
const Pagamento = require('./Pagamento');
const Vendedor = require('./Vendedor');
const Cliente = require('./Cliente');
const Produto = require('./Produto');
const Venda = require('./Venda');
const CRUD = require('./CRUD');

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
app.use(cors());


/* ==========================================================================
// Rotas CRUD para cliente
*/

app.get('/cliente', (req, res) => {
  const crud = new CRUD(connection);
  crud.listar('cliente', (cliente) => {
    console.log(cliente);
    res.json(cliente);
  });
});

app.post('/login_cliente', (req, res) => {
  const crud = new CRUD(connection);
  const { cpf } = req.body;

  // Verifica se o CPF foi fornecido
  if (!cpf) {
    return res.status(400).json({ success: false, message: 'CPF é obrigatório' });
  }

  // Pesquisa o cliente no banco de dados com base no CPF
  crud.pesquisarPorCpf('cliente', parseInt(cpf), (result) => {
    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
    } else {
      return res.status(200).json({ success: true, message: 'Login bem-sucedido', cliente: result[0] });
    }
  });
});

app.get('/cliente/:cpf', (req, res) => {
  const crud = new CRUD(connection);
  const { cpf } = req.params;

  // Verifica se o CPF foi fornecido
  if (!cpf) {
    return res.status(400).json({ success: false, message: 'CPF é obrigatório' });
  }

  // Pesquisa o cliente no banco de dados com base no CPF
  crud.pesquisarPorCpf('cliente', parseInt(cpf), (result) => {
    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
    } else {
      return res.status(200).json({ success: true, message: 'Cliente encontrado', cliente: result[0] });
    }
  });
});

app.post('/cliente', (req, res) => {
  const crud = new CRUD(connection);
  const { nome, cpf, email, endereco, cidade, telefone, torce_fla, onepiece } = req.body;
  const cliente = new Cliente(null, nome, cpf, email, endereco, cidade, telefone, torce_fla, onepiece );
  crud.inserir('cliente', cliente, (result) => {
    res.json({ message: 'Cliente inserido com sucesso', id: result.insertId });
  });
});

app.put('/cliente/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  const { nome, cpf, email, endereco, cidade, telefone, torce_fla, onepiece } = req.body;
  const clienteAtualizado = new Cliente(id, nome, cpf, email, endereco, cidade, telefone, torce_fla, onepiece);
  console.log(clienteAtualizado);
  crud.atualizar('cliente', id, clienteAtualizado, (result) => {
    if(result.affectedRows == 0){
      console.log(result);
        res.json({ message: 'Cliente não encontrado' });
    }
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

/* ==========================================================================
// Rotas CRUD para vendedor
*/

app.get('/vendedor', (req, res) => {
  const crud = new CRUD(connection);
  crud.listar('vendedor', (vendedor) => {
    res.json(vendedor);
  });
});

app.post('/login_vendedor', (req, res) => {
  const crud = new CRUD(connection);
  const { cpf } = req.body;

  // Verifica se o CPF foi fornecido
  if (!cpf) {
    return res.status(400).json({ success: false, message: 'CPF é obrigatório' });
  }

  // Pesquisa o vendedor no banco de dados com base no CPF
  crud.pesquisarPorCpf('vendedor', parseInt(cpf), (result) => {
    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Vendedor não encontrado' });
    } else {
      return res.status(200).json({ success: true, message: 'Login bem-sucedido', vendedor: result[0] });
    }
  });
});

app.get('/vendedor/:cpf', (req, res) => {
  const crud = new CRUD(connection);
  const { cpf } = req.params;

  // Verifica se o CPF foi fornecido
  if (!cpf) {
    return res.status(400).json({ success: false, message: 'CPF é obrigatório' });
  }

  // Pesquisa o vendedor no banco de dados com base no CPF
  crud.pesquisarPorCpf('vendedor', parseInt(cpf), (result) => {
    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Vendedor não encontrado' });
    } else {
      return res.status(200).json({ success: true, message: 'Login bem-sucedido', vendedor: result[0] });
    }
  });
});

app.post('/vendedor', (req, res) => {
  const crud = new CRUD(connection);
  const { nome, cpf, email, telefone } = req.body;
  const vendedor = new Vendedor(null, nome, cpf, email, telefone );
  crud.inserir('vendedor', vendedor, (result) => {
    res.json({ message: 'Vendedor inserido com sucesso', id: result.insertId });
  });
});

app.put('/vendedor/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  const { nome, cpf, email, telefone, } = req.body;
  const vendedorAtualizado = new Vendedor(id, nome, cpf, email, telefone );
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

/* ==========================================================================
// Rotas CRUD para produtos
*/

app.get('/produto', (req, res) => {
  const crud = new CRUD(connection);
  crud.listar('produto', (produtos) => {
    if (produtos == null)
        console.log("Nao há produtos.");
    else
       // console.log(produtos);
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

/* ==========================================================================
// Rotas CRUD para venda 
// erro se colocar vendedor/cliente que nao existe!
*/

app.get('/venda', (req, res) => {
  const crud = new CRUD(connection);
  crud.listar('venda', (vendas) => {
    if (vendas == null)
        console.log("Nao há vendas.");
    else
        //console.log(vendas);
    res.json(vendas);
  });
});

app.post('/venda', (req, res) => {
  const crud = new CRUD(connection);
  const { cliente_id, vendedor_id, data_venda, total_venda } = req.body;
  const venda = new Venda(null, parseInt(cliente_id), parseInt(vendedor_id), data_venda, parseFloat(total_venda));
  crud.inserir('venda', venda, (result) => {
    res.json({ message: 'Venda inserido com sucesso', id: result.insertId });
  });
});

app.get('/venda/:cliente_id', (req, res) => {
  const crud = new CRUD(connection);
  const { cliente_id } = req.params;

  // Verifica se o id foi fornecido
  if (!cliente_id) {
    return res.status(400).json({ success: false, message: 'id do cliente é obrigatório' });
  }

  // Pesquisa o vendedor no banco de dados com base no CPF
  crud.pesquisarPorC_ID('venda', parseInt(cliente_id), (result) => {
    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Pedido não encontrado' });
    } else {
      return res.status(200).json({ success: true, message: 'Pedido encontrado', pedidos: result });
    }
  });
});

app.put('/venda/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  const { cliente_id, vendedor_id, data_venda, total_venda } = req.body;
  const vendaAtualizado = new Venda(id, parseInt(cliente_id), parseInt(vendedor_id), data_venda, parseFloat(total_venda));
  crud.atualizar('venda', id, vendaAtualizado, (result) => {
    if(result.affectedRows == 0)
        res.json({ message: 'Venda não encontrada' });
    else
        res.json({ message: 'Venda atualizado com sucesso' });
  });
});

app.delete('/venda/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  crud.deletar('venda', id, (result) => {
    if(result.affectedRows == 0)
        res.json({ message: 'Venda não encontrado' });
    else
    res.json({ message: 'Venda removido com sucesso' });
  });
});

/* ==========================================================================
// Rotas CRUD para item_venda
// Alterar CRUD para verificar quantidade vendida
*/

app.get('/item_venda', (req, res) => {
  const crud = new CRUD(connection);
  crud.listar('item_venda', (item_vendas) => {
    if (item_vendas == null)
        console.log("Nao há itens vendidos com esse ID.");
    else
        //console.log(item_vendas);
    res.json(item_vendas);
  });
});

app.post('/item_venda', (req, res) => {
  const crud = new CRUD(connection);
  const { venda_id, produto_id, quantidade, preco_unitario } = req.body;
  const item_venda = new Item_Venda( null, venda_id, produto_id, parseInt(quantidade), parseFloat(preco_unitario) );
  crud.inserir('item_venda', item_venda, (result) => {
    res.json({ message: 'Itens vendidos inseridos com sucesso', id: result.insertId });
  });
});

app.put('/item_venda/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  const { venda_id, produto_id, quantidade, preco_unitario  } = req.body;
  const item_vendaAtualizado = new Item_Venda(id, venda_id, produto_id, parseInt(quantidade), parseFloat(preco_unitario) );
  crud.atualizar('item_venda', id, item_vendaAtualizado, (result) => {
    if(result.affectedRows == 0)
        res.json({ message: 'Item vendido não encontrada' });
    else
        res.json({ message: 'Item vendido atualizado com sucesso' });
  });
});

app.delete('/item_venda/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  crud.deletar('item_venda', id, (result) => {
    if(result.affectedRows == 0)
        res.json({ message: 'Item vendido não encontrado' });
    else
    res.json({ message: 'Item vendido removido com sucesso' });
  });
});

/* ==========================================================================
// Rotas CRUD para forma_pagamento
// ate agora desnecessaria, já vem no BD
*/
/*
app.get('/forma_pagamento', (req, res) => {
  const crud = new CRUD(connection);
  crud.listar('forma_pagamento', (forma_pagamentos) => {
    if (forma_pagamentos == null)
        console.log("Nao há forma_pagamentos.");
    else
        console.log(forma_pagamentos);
    res.json(forma_pagamentos);
  });
});

app.post('/forma_pagamento', (req, res) => {
  const crud = new CRUD(connection);
  const { forma_pagamento_id, descricao, status_pagamento } = req.body;
  const forma_pagamento = new Forma_pagamento( parseInt(forma_pagamento_id), descricao, status_pagamento);
  crud.inserir('forma_pagamento', forma_pagamento, (result) => {
    res.json({ message: 'forma_pagamento inserido com sucesso', id: result.insertId });
  });
});

app.put('/forma_pagamento/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  const { forma_pagamento_id, descricao, status_pagamento } = req.body;
  const forma_pagamentoAtualizado = new Forma_pagamento( parseInt(forma_pagamento_id), descricao, status_pagamento );
  crud.atualizar('forma_pagamento', id, forma_pagamentoAtualizado, (result) => {
    if(result.affectedRows == 0)
        res.json({ message: 'forma_pagamento não encontrado' });
    else
        res.json({ message: 'forma_pagamento atualizado com sucesso' });
  });
});

app.delete('/forma_pagamento/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  crud.deletar('forma_pagamento', id, (result) => {
    if(result.affectedRows == 0)
        res.json({ message: 'forma_pagamento não encontrado' });
    else
    res.json({ message: 'forma_pagamento removido com sucesso' });
  });
});
*/

/* ==========================================================================
// Rotas CRUD para pagamento
// 
*/

app.get('/pagamento', (req, res) => {
  const crud = new CRUD(connection);
  crud.listar('pagamento', (pagamentos) => {
    if (pagamentos == null)
        console.log("Nao há pagamentos.");
    else
        //console.log(pagamentos);
    res.json(pagamentos);
  });
});

app.post('/pagamento', (req, res) => {
  const crud = new CRUD(connection);
  const { venda_id, forma_pagamento_id, data_pagamento, status_pagamento } = req.body;
  const pagamento = new Pagamento(null, parseInt(venda_id), parseInt(forma_pagamento_id), data_pagamento, status_pagamento);
  crud.inserir('pagamento', pagamento, (result) => {
    res.json({ message: 'Pagamento inserido com sucesso', id: result.insertId });
  });
});

app.put('/pagamento/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  const { venda_id, forma_pagamento_id, data_pagamento, status_pagamento } = req.body;
  const pagamentoAtualizado = new Pagamento(id, parseInt(venda_id), parseInt(forma_pagamento_id), data_pagamento, status_pagamento);
  crud.atualizar('pagamento', id, pagamentoAtualizado, (result) => {
    if(result.affectedRows == 0)
        res.json({ message: 'Pagamento não encontrado' });
    else
        res.json({ message: 'Pagamento atualizado com sucesso' });
  });
});

app.delete('/pagamento/:id', (req, res) => {
  const crud = new CRUD(connection);
  const { id } = req.params;
  crud.deletar('pagamento', id, (result) => {
    if(result.affectedRows == 0)
        res.json({ message: 'Pagamento não encontrado' });
    else
    res.json({ message: 'Pagamento removido com sucesso' });
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
