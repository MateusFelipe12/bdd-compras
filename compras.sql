-- Criação do banco de dados "compras"
CREATE DATABASE compras;

-- Conectar ao banco de dados "compras"
\c compras;


-- Criação da tabela Cliente
CREATE TABLE client (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    cidade VARCHAR(255),
    uf VARCHAR(2),
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Criação da tabela Compras
CREATE TABLE buy (
    codigo SERIAL PRIMARY KEY,
    produto VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data DATE NOT NULL,
    id_client INTEGER REFERENCES client(id)
);
