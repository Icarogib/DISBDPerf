const CRUD = require('./CRUD');
const Cliente = require('./cliente');
const Produto = require('./Produto');
const Venda = require('./Venda');
const mysql = require('mysql2');
const readline = require('readline');

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

// Configuração da interface de leitura do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function gerarRelatorioDeClientes() {
  // Consulta para obter o valor total das compras de cada cliente
  const sql = `
    SELECT clientes.id, clientes.nome, COALESCE(SUM(vendas.quantidade_vendida * estoque.preco), 0) AS totalComprado
    FROM clientes
    LEFT JOIN vendas ON clientes.id = vendas.cliente_id
    LEFT JOIN estoque ON vendas.produto_id = estoque.id
    GROUP BY clientes.id`;
  // O SQL retorna o total de compras feitas por cada cliente,
  // calculando o valor total baseado na quantidade de produtos vendidos e seus precos.
  // A consulta utiliza LEFT JOINs para garantir que todos os clientes sejam incluidos,
  // mesmo que eles ainda nao tenham feito nenhuma compra. Se um cliente nao tiver feito compras,
  // o valor total sera considerado como 0.

  // A funcao COALESCE para garantir que, se nao houver vendas associadas a um cliente, 
  // o totalComprado sera 0. O calculo do total e feito multiplicando a quantidade vendida
  // pelo preco do produto.

  connection.query(sql, (err, results) => {
    if (err) throw err;

    console.log('Relatório de Clientes:');
    results.forEach(cliente => {
      console.log(`Cliente ID: ${cliente.id}, Nome: ${cliente.nome}, Total Comprado: R$${cliente.totalComprado ? cliente.totalComprado : '0.00'}`);
    });

    // Exibir quantidade total de clientes
    const sqlTotalClientes = 'SELECT COUNT(*) AS totalClientes FROM clientes';
    //O SQL acima seleciona toda a tabela de cliente, porem retorna a soma total dos conteudos nela
    connection.query(sqlTotalClientes, (err, result) => {
      if (err) throw err;
      console.log('Quantidade total de clientes:', result[0].totalClientes);

      // Consulta para obter o valor total de todas as compras
      const sqlTotalCompras = `
        SELECT COALESCE(SUM(vendas.quantidade_vendida * estoque.preco), 0) AS totalCompras
        FROM vendas
        JOIN estoque ON vendas.produto_id = estoque.id`;
        //A diferenca desse SQL para o primeiro eh o uso do JOIN que retorna o conteudo apenas no qual a condicao vendas.produto_id = estoque.id` for verdadeira
        //Diferentemente do LEFT JOIN que retorna praticamente todo o conteudo, no qual a condicao nao se encaixa, com NULL
      connection.query(sqlTotalCompras, (err, result) => {
        if (err) throw err;
        console.log('Valor total das compras de todos os clientes: R$' + result[0].totalCompras);
        menuRelatorios(); // Voltar ao menu de relatórios
      });
    });
  });
}

function gerarRelatorioDeEstoque() {
  const sql = `SELECT estoque.id, estoque.nome_produto, estoque.preco, estoque.quantidade,
               (estoque.quantidade - IFNULL(SUM(vendas.quantidade_vendida), 0)) AS quantidade_restante
               FROM estoque
               LEFT JOIN vendas ON estoque.id = vendas.produto_id
               GROUP BY estoque.id,
                estoque.nome_produto,
                estoque.preco,
                estoque.quantidade`;
  // Seleciona o ID do produto, nome do produto, preco, quantidade original em estoque
  // e calcula a quantidade restante apos considerar as vendas.

  // Depois calcula a quantidade restante em estoque, subtraindo a soma da quantidade vendida (vendas.quantidade_vendida)
  // da quantidade original em estoque (estoque.quantidade).
  // Usa IFNULL para tratar casos em que nao ha vendas registradas para o produto, substituindo por 0.

  // Realiza um LEFT JOIN com a tabela 'vendas', associando cada produto as suas vendas,
  // usando o campo 'produto_id' da tabela 'vendas' e o campo 'id' da tabela 'estoque'.
  // O LEFT JOIN garante que todos os produtos sejam retornados, mesmo que nao tenham vendas associadas.

  //Por fim, agrupa os resultados por ID do produto, nome do produto, preco e quantidade
  connection.query(sql, (err, results) => {
    if (err) throw err;

    console.log('Relatório de Estoque:');
    results.forEach(produto => {
      console.log(`Produto ID: ${produto.id}, Nome: ${produto.nome_produto}, Preço: R$${produto.preco}, Quantidade Restante: ${produto.quantidade_restante}`);
    });

    // Exibir quantidade total de itens em estoque
    const sqlTotalItens = 'SELECT (SELECT SUM(quantidade) FROM estoque) - (SELECT SUM(quantidade_vendida) FROM vendas) AS totalItens';
    connection.query(sqlTotalItens, (err, result) => {
      if (err) throw err;
      console.log('Quantidade total de itens em estoque:', result[0].totalItens);
      menuRelatorios(); // Voltar ao menu de relatórios
    });
  });
}

function gerarRelatorioDeVendas() {
  const sqlVendas = `
    SELECT vendas.id, clientes.nome AS cliente, estoque.nome_produto AS produto, vendas.quantidade_vendida, (vendas.quantidade_vendida * estoque.preco) AS valor_total
    FROM vendas
    JOIN clientes ON vendas.cliente_id = clientes.id
    JOIN estoque ON vendas.produto_id = estoque.id`;

  const sqlTotalVendas = 'SELECT SUM(quantidade_vendida) AS totalItensVendidos, SUM(vendas.quantidade_vendida * estoque.preco) AS totalValorVendas FROM vendas JOIN estoque ON vendas.produto_id = estoque.id';

  // Seleciona o ID da venda, o nome do cliente, o nome do produto vendido,
  // a quantidade vendida e o valor total dessa venda
  // calcula o valor total da venda multiplicando a quantidade vendida pelo preco do produto selecinando da tabela vendas.

  // Realiza um JOIN entre as tabelas 'vendas' e 'clientes',
  // associando cada venda ao respectivo cliente atraves do campo 'cliente_id' da tabela 'vendas'
  // e o campo 'id' da tabela 'clientes'
  // A mesma ocorre para o JOIN debaixo, porem com a tabela estoque 

  // Listar todas as vendas detalhadamente
  connection.query(sqlVendas, (err, resultVendas) => {
    if (err) throw err;

    console.log('Relatório de Vendas:');
    resultVendas.forEach(venda => {
      console.log(`Venda ID: ${venda.id}, Cliente: ${venda.cliente}, Produto: ${venda.produto}, Quantidade: ${venda.quantidade_vendida}, Valor Total: R$${venda.valor_total}`);
    });

    // Calcular a quantidade total de itens vendidos e o valor total das vendas
    connection.query(sqlTotalVendas, (err, resultTotal) => {
      if (err) throw err;

      const totalItensVendidos = resultTotal[0].totalItensVendidos || 0;
      const totalValorVendas = resultTotal[0].totalValorVendas || 0;

      console.log('Quantidade total de itens vendidos:', totalItensVendidos);
      console.log('Valor total das vendas: R$', totalValorVendas);

      menuRelatorios(); // Voltar ao menu de relatórios
    });
  });
}

function menuClasse() {
  rl.question(`Escolha a classe para manipular:
  1: Cliente
  2: Estoque
  3: Venda
  4: Relatórios
  5: Sair
  `, (classeEscolhida) => {
    switch (classeEscolhida) {
      case '1':
        menuCliente();
        break;
      case '2':
        menuEstoque();
        break;
      case '3':
        menuVenda();
        break;
      case '4':
        menuRelatorios();
        break;
      case '5':
        rl.close();
        connection.end();
        break;
      default:
        console.log('Opção inválida. Tente novamente.');
        menuClasse();
        break;
    }
  });
}

function menuCliente() {
  rl.question(`Escolha a operação:
  1: Inserir
  2: Alterar
  3: Pesquisar por Nome
  4: Remover
  5: Listar Todos
  6: Exibir por ID
  7: Voltar ao Menu Principal
  `, (opcao) => {
    const crud = new CRUD(connection);

    switch (opcao) {
        case '1': // Inserir Cliente
                rl.question('Digite o nome do cliente: ', (nome) => {
                  rl.question('Digite o endereço do cliente: ', (endereco) => {
                    rl.question('Digite o telefone do cliente: ', (telefone) => {
                      const cliente = new Cliente(null, nome, endereco, telefone);
                      crud.inserir('clientes', cliente, (result) => {
                          console.log('Cliente inserido com sucesso, ID:', result.insertId);
                          menuCliente();
                      });
                    });
                  });
                });
                break;


      case '2': // Alterar Cliente
        rl.question('Digite o ID do cliente que deseja alterar: ', (id) => {
          rl.question('Digite o novo nome do cliente: ', (nome) => {
            rl.question('Digite o novo endereço do cliente: ', (endereco) => {
              rl.question('Digite o novo telefone do cliente: ', (telefone) => {
                const clienteAtualizado = new Cliente(id, nome, endereco, telefone);
                crud.atualizar('clientes', id, clienteAtualizado, (result) => {
                  console.log('Cliente atualizado com sucesso.');
                  menuCliente();
                });
              });
            });
          });
        });
        break;

      case '3': // Pesquisar Cliente por Nome
        rl.question('Digite o nome do cliente: ', (nome) => {
          crud.pesquisarPorNome(nome, (clientes) => {
            console.log('Resultados da pesquisa:', clientes);
            menuCliente();
          });
        });
        break;

      case '4': // Remover Cliente
        rl.question('Digite o ID do cliente que deseja remover: ', (id) => {
          crud.deletar('clientes', id, (result) => {
            console.log('Cliente removido com sucesso.');
            menuCliente();
          });
        });
        break;

      case '5': // Listar Todos os Clientes
        crud.listar('clientes', (clientes) => {
          console.log('Lista de Clientes:', clientes);
          menuCliente();
        });
        break;

      case '6': // Exibir Cliente por ID
        rl.question('Digite o ID do cliente: ', (id) => {
          crud.pesquisarPorId('clientes', id, (cliente) => {
            console.log('Cliente encontrado:', cliente);
            menuCliente();
          });
        });
        break;

      case '7': // Voltar ao Menu Principal
        menuClasse();
        break;

      default:
        console.log('Opção inválida. Tente novamente.');
        menuCliente();
        break;
    }
  });
}

function menuEstoque() {
  rl.question(`Escolha a operação:
  1: Inserir
  2: Alterar
  3: Pesquisar por Nome
  4: Remover
  5: Listar Todos
  6: Exibir por ID
  7: Voltar ao Menu Principal
  `, (opcao) => {
    const crud = new CRUD(connection);

    switch (opcao) {
      case '1': // Inserir Produto
        rl.question('Digite o nome do produto: ', (nome_produto) => {
          rl.question('Digite o preço do produto: ', (preco) => {
            rl.question('Digite a quantidade do produto: ', (quantidade) => {
              const produto = new Produto(null, nome_produto, parseFloat(preco), parseInt(quantidade));
              crud.inserir('estoque', produto, (result) => {
                console.log('Produto inserido com sucesso, ID:', result.insertId);
                menuEstoque();
              });
            });
          });
        });
        break;

      case '2': // Alterar Produto
        rl.question('Digite o ID do produto que deseja alterar: ', (id) => {
          rl.question('Digite o novo nome do produto: ', (nome_produto) => {
            rl.question('Digite o novo preço do produto: ', (preco) => {
              rl.question('Digite a nova quantidade do produto: ', (quantidade) => {
                const produtoAtualizado = new Produto(id, nome_produto, parseFloat(preco), parseInt(quantidade));
                crud.atualizar('estoque', id, produtoAtualizado, (result) => {
                  console.log('Produto atualizado com sucesso.');
                  menuEstoque();
                });
              });
            });
          });
        });
        break;

      case '3': // Pesquisar Produto por Nome
        rl.question('Digite o nome do produto: ', (nome) => {
          crud.pesquisarPorNomeEstoque(nome, (produtos) => {
            console.log('Resultados da pesquisa:', produtos);
            menuEstoque();
          });
        });
        break;

      case '4': // Remover Produto
        rl.question('Digite o ID do produto que deseja remover: ', (id) => {
          crud.deletar('estoque', id, (result) => {
            console.log('Produto removido com sucesso.');
            menuEstoque();
          });
        });
        break;

      case '5': // Listar Todos os Produtos
        crud.listar('estoque', (produtos) => {
          console.log('Lista de Produtos:', produtos);
          menuEstoque();
        });
        break;

      case '6': // Exibir Produto por ID
        rl.question('Digite o ID do produto: ', (id) => {
          crud.pesquisarPorId('estoque', id, (produto) => {
            console.log('Produto encontrado:', produto);
            menuEstoque();
          });
        });
        break;

      case '7': // Voltar ao Menu Principal
        menuClasse();
        break;

      default:
        console.log('Opção inválida. Tente novamente.');
        menuEstoque();
        break;
    }
  });
}

function menuVenda() {
  rl.question(`Escolha a operação:
  1: Inserir
  2: Alterar
  3: Pesquisar por Nome
  4: Remover
  5: Listar Todos
  6: Exibir por ID
  7: Voltar ao Menu Principal
  `, (opcao) => {
    const crud = new CRUD(connection);

    switch (opcao) {
      case '1': // Inserir Venda
        rl.question('Digite o ID do cliente: ', (cliente_id) => {
          rl.question('Digite o ID do produto: ', (produto_id) => {
            rl.question('Digite a quantidade vendida: ', (quantidade) => {
              const venda = new Venda(null, parseInt(cliente_id),parseInt(produto_id),parseInt(quantidade));
              crud.inserir('vendas', venda, (result) => {
                if(result != null)
                    console.log('Venda inserida com sucesso, ID:', result.insertId);
                else
                    console.log('Venda Recusada!')
                menuVenda();
              });
            });
          });
        });
        break;

      case '2': // Alterar Venda
        rl.question('Digite o ID da venda que deseja alterar: ', (id) => {
          rl.question('Digite o novo ID do cliente: ', (cliente_id) => {
            rl.question('Digite o novo ID do produto: ', (produto_id) => {
              rl.question('Digite a nova quantidade vendida: ', (quantidade) => {
                const vendaAtualizada = new Venda(id, parseInt(cliente_id),parseInt(produto_id),parseInt(quantidade));
                crud.atualizar('vendas', id, vendaAtualizada, (result) => {
                  console.log('Venda atualizada com sucesso.');
                  menuVenda();
                });
              });
            });
          });
        });
        break;

      case '3': // Pesquisar Venda por Nome (A pesquisa será feita pelo nome do cliente ou produto associado)
        rl.question('Digite o nome do cliente ou produto associado à venda: ', (nome) => {
          crud.pesquisarPorNomeVenda(nome, (vendas) => {
            console.log('Resultados da pesquisa:', vendas);
            menuVenda();
          });
        });
        break;

      case '4': // Remover Venda
        rl.question('Digite o ID da venda que deseja remover: ', (id) => {
          crud.deletar('vendas', id, (result) => {
            console.log('Venda removida com sucesso.');
            menuVenda();
          });
        });
        break;

      case '5': // Listar Todas as Vendas
        crud.listar('vendas', (vendas) => {
          console.log('Lista de Vendas:', vendas);
          menuVenda();
        });
        break;

      case '6': // Exibir Venda por ID
        rl.question('Digite o ID da venda: ', (id) => {
          crud.pesquisarPorId('vendas', id, (venda) => {
            console.log('Venda encontrada:', venda);
            menuVenda();
          });
        });
        break;

      case '7': // Voltar ao Menu Principal
        menuClasse();
        break;

      default:
        console.log('Opção inválida. Tente novamente.');
        menuVenda();
        break;
    }
  });
}

// Função para exibir relatórios
function menuRelatorios() {
  rl.question(`Escolha o relatório que deseja visualizar:
  1: Relatório de Clientes
  2: Relatório de Estoque
  3: Relatório de Vendas
  4: Voltar ao Menu Principal
  `, (opcao) => {
    switch (opcao) {
      case '1':
        gerarRelatorioDeClientes();
        break;
      case '2':
        gerarRelatorioDeEstoque();
        break;
      case '3':
        gerarRelatorioDeVendas();
        break;
      case '4':
        menuClasse();
        break;
      default:
        console.log('Opção inválida. Tente novamente.');
        menuRelatorios();
        break;
    }
  });
}

// Inicia a aplicação com o menu principal
menuClasse();
