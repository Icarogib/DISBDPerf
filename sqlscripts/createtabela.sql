CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(40) NOT NULL,
    cpf INT NOT NULL,
    email VARCHAR(40) NOT NULL,
    endereco VARCHAR(50) NOT NULL,
    cidade VARCHAR(20) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    torce_fla BOOLEAN NOT NULL,
    onepiece BOOLEAN NOT NULL
);


CREATE TABLE vendedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    cpf INT NOT NULL,
    email VARCHAR(40) NOT NULL,
    telefone VARCHAR(20) NOT NULL
);


CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    descricao VARCHAR(45) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(45) NOT NULL,
    fabricado_em BOOLEAN NOT NULL,
    estoque INT NOT NULL
);

CREATE TABLE venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    vendedor_id INT NOT NULL,
    data_venda VARCHAR(45) NOT NULL,
    total_venda DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (vendedor_id) REFERENCES vendedor(id)
);

CREATE TABLE item_venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venda_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (venda_id) REFERENCES venda(id),
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);

CREATE TABLE forma_pagamento (
    id INT PRIMARY KEY,
    descricao VARCHAR(45) NOT NULL
);

CREATE TABLE pagamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venda_id INT NOT NULL,
    forma_pagamento_id INT NOT NULL,
    data_pagamento VARCHAR(20) NOT NULL,
    status_pagamento VARCHAR(30) NOT NULL,
    FOREIGN KEY (forma_pagamento_id) REFERENCES forma_pagamento(id),
    FOREIGN KEY (venda_id) REFERENCES venda(id)
);

insert into forma_pagamento 
values (1, 'Boleto');

insert into forma_pagamento 
values (2, 'Cartao de Debito');

insert into forma_pagamento 
values (3, 'Cartao de Credito');

insert into forma_pagamento 
values (4, 'Pix');

insert into forma_pagamento 
values (5, 'Berries');