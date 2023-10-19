-- Criação do banco de dados
CREATE DATABASE dindin WITH ENCODING = 'UTF8';
-- Criação da tabela de usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);
-- Criação da tabela de categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);
-- Criação da tabela de transações
CREATE TABLE transacoes (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(10) NOT NULL,
    descricao VARCHAR(60) NOT NULL,
    valor INTEGER NOT NULL,
    data TIMESTAMP NOT NULL,
    usuario_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
    categoria_id INTEGER NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias (id),
);
-- Inserção de categorias
INSERT INTO categorias (descricao)
VALUES ('Alimentação'),
    ('Assinaturas e Serviços'),
    ('Casa'),
    ('Mercado'),
    ('Cuidados Pessoais'),
    ('Educação'),
    ('Família'),
    ('Lazer'),
    ('Pets'),
    ('Presentes'),
    ('Roupas'),
    ('Saúde'),
    ('Transporte'),
    ('Salário'),
    ('Vendas'),
    ('Outras Receitas'),
    ('Outras Despesas');
/* Fim Aqui*/