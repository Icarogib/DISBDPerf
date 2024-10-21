class CRUD {
    constructor(connection) {
      this.connection = connection;
    }

    inserir(table, data, callback) {
      /*//a tabela vendas possue um tratamento especial para verificar se o produto que sera vendido eh possivel
      //Se a quantidade a ser vendida eh maior que a disponivel no estoque, a venda nao eh concluida
      if (table === 'item_venda') {
        const { produto_id, quantidade_vendida } = data;

        // Verifica a quantidade disponível no estoque
        const sqlEstoque = `SELECT (produto.estoque - IFNULL(SUM(item_venda.quantidade), 0)) AS quantidade_restante
                            FROM estoque
                            LEFT JOIN vendas ON produto.id = item_venda.produto_id
                            WHERE produto.id = ?
                            GROUP BY
                            produto.estoque`;
        //O comando em SQL acima seleciona a quantidade restante de um produto especifico no estoque
        // A funcao IFNULL eh usada para garantir que, se nao houver vendas registradas para aquele produto,
        // a soma das quantidades vendidas sera considerada como 0, em vez de NULL.
        // O LEFT JOIN garante que todos os produtos no estoque sejam incluidos, mesmo que nao haja vendas 
        // registradas para eles. Caso contrario, o produto nao apareceria se nao houvesse registros correspondentes na tabela vendas.

        this.connection.query(sqlEstoque, [produto_id], (err, result) => {
          if (err) throw err;
            console.log(result)
          if (result.length > 0) {
            const quantidadeDisponivel = result[0].quantidade_restante;

            // Verifica se a quantidade vendida eh menor ou igual a quantidade disponivel no estoque
            if (quantidade_vendida <= quantidadeDisponivel) {
              // Insere a venda
              const keys = Object.keys(data);
              const values = Object.values(data);
              const sqlInsert = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`;

              this.connection.query(sqlInsert, values, (err, results2) => {
                if (err) throw err;
                //console.log(Venda inserida com sucesso!);
                  callback(results2);
                //});
              });
            } else {
              console.log(`Erro: Quantidade insuficiente em estoque. Quantidade disponível: ${quantidadeDisponivel}, Quantidade solicitada: ${quantidade_vendida}`);
              callback(null, { error: 'Quantidade insuficiente em estoque.' });
            }
          } else {
            console.log('Erro: Produto não encontrado no estoque.');
            callback(null, { error: 'Produto não encontrado.' });
          }
        });
      } else {*/
        // Insere para outras tabelas que não sejam vendas
        const keys = Object.keys(data);
        const values = Object.values(data);
        const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`;
        this.connection.query(sql, values, (err, results) => {
          if (err) throw err;
          callback(results);
        });
      //}
    }

  
    listar(table, callback) {
      //seleciona todo o conteudo da tabela passada pelo parametro
      const sql = `SELECT * FROM ${table}`;
      this.connection.query(sql, (err, results) => {
        if (err) throw err;
        callback(results);
      });
    }
  
    pesquisarPorNome(nome, callback) {
      //seleciona todo o conteudo da tabela cliente onde nome for igual ao passado pelo parametro
      const sql = `SELECT * FROM cliente WHERE nome LIKE ?`;
      this.connection.query(sql, [`%${nome}%`], (err, results) => {
        if (err) throw err;
        callback(results);
      });
    }
  
    pesquisarPorNomeEstoque(nome, callback) {
      //seleciona todo o conteudo da tabela cliente onde nome for igual ao passado pelo parametro
       const sql = `SELECT * FROM estoque WHERE nome_produto LIKE ?`;
       this.connection.query(sql, [`%${nome}%`], (err, results) => {
         if (err) throw err;
         callback(results);
       });
     }
  
    pesquisarPorNomeVenda(nome, callback) {
      const sql = `
          SELECT vendas.*, cliente.nome, estoque.nome_produto
          FROM vendas
          JOIN cliente ON vendas.cliente_id = cliente.id
          JOIN estoque ON vendas.produto_id = estoque.id
          WHERE cliente.nome LIKE ? OR estoque.nome_produto LIKE ?`;
      // Esta consulta SQL seleciona informacoes das tabelas 'vendas', 'cliente' e 'estoque' 
      // e retorna resultados com base no nome do cliente ou no nome do produto.

      // A query faz o JOIN entre as tabelas 'vendas', 'cliente' e 'estoque' para correlacionar os dados 
      // de vendas com o nome dos cliente e dos produtos.

      this.connection.query(sql, [`%${nome}%`, `%${nome}%`], (err, results) => {
          if (err) throw err;
          callback(results);
      });
     }
  
    pesquisarPorId(table, id, callback) {//Seleciona todo o conteudo da tabela no qual o ID eh igual o passado no parametro
      const sql = `SELECT * FROM ${table} WHERE id = ?`;
      this.connection.query(sql, [id], (err, results) => {
        if (err) throw err;
        callback(results);
      });
    }

    pesquisarPorCpf(table, cpf, callback) {//Seleciona todo o conteudo da tabela no qual o CPF eh igual o passado no parametro
      const sql = `SELECT * FROM ${table} WHERE cpf = ?`;
      this.connection.query(sql, [cpf], (err, results) => {
        if (err) {
          console.error('Erro ao buscar cliente por CPF:', err);
          callback([]);
        } else {
          //console.log(results);
          callback(results);
        }
      });
    }
    
    pesquisarPorC_ID(table, cliente_id, callback) {
      const sql = `SELECT * FROM ${table} WHERE cliente_id = ?`;
      this.connection.query(sql, [cliente_id], (err, results) => {
        if (err) {
          //console.error('Erro ao buscar cliente por id:', err);
          callback([]);
        } else {
          //console.log(results);
          callback(results);
        }
      });
    }
    atualizar(table, id, data, callback) {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const sql = `UPDATE ${table} SET ${keys.map(key => `${key} = ?`).join(', ')} WHERE id = ?`;
      //O comando acima ficaria dessa forma:
      //UPDATE nome_tabela SET (?,?,?) WHERE id = ?
      //o comando map retorna a quantidade de keys(quantidade de colunas nas quais havera update) e seta elas como ?
      this.connection.query(sql, [...values, id], (err, results) => {
        if (err) throw err;
        callback(results);
      });
    }
  
    deletar(table, id, callback) {//Remove a linha da tabela onde o ID for igual o passado por parametro
      const sql = `DELETE FROM ${table} WHERE id = ?`;
      this.connection.query(sql, [id], (err, results) => {
        if (err) throw err;
        callback(results);
      });
    }
  }

  module.exports = CRUD;