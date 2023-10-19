-- Inserção de usuários
INSERT INTO usuarios (nome, email, senha)
VALUES ('João Silva', 'joao.silva@email.com', 'senha123'),
    (
        'Maria Santos',
        'maria.santos@email.com',
        'senha456'
    ),
    (
        'Pedro Alves',
        'pedro.alves@email.com',
        'senha789'
    ),
    (
        'Ana Ferreira',
        'ana.ferreira@email.com',
        'senha101112'
    ),
    (
        'Luiz Oliveira',
        'luiz.oliveira@email.com',
        'senha131415'
    ),
    (
        'Mariana Lima',
        'mariana.lima@email.com',
        'senha161718'
    ),
    (
        'Carlos Ribeiro',
        'carlos.ribeiro@email.com',
        'senha192021'
    ),
    (
        'Lúcia Souza',
        'lucia.souza@email.com',
        'senha222324'
    ),
    (
        'Eduardo Santos',
        'eduardo.santos@email.com',
        'senha252627'
    ),
    (
        'Isabela Ferreira',
        'isabela.ferreira@email.com',
        'senha282930'
    );
-- Inserção de transações
INSERT INTO transacoes (
        descricao,
        valor,
        data,
        categoria_id,
        usuario_id,
        tipo
    )
VALUES (
        'Assinaturas Mensais',
        100,
        '2023-09-01 08:00:00',
        1,
        1,
        'Saída'
    ),
    (
        'Supermercado',
        150,
        '2023-09-02 09:30:00',
        3,
        1,
        'Saída'
    ),
    (
        'Aluguel',
        110,
        '2023-09-01 10:45:00',
        2,
        2,
        'Saída'
    ),
    (
        'Restaurante',
        160,
        '2023-09-02 14:20:00',
        5,
        2,
        'Saída'
    ),
    (
        'Transporte',
        95,
        '2023-09-01 16:10:00',
        6,
        3,
        'Saída'
    ),
    (
        'Lazer',
        145,
        '2023-09-02 11:05:00',
        8,
        3,
        'Saída'
    ),
    (
        'Materiais de Estudo',
        105,
        '2023-09-01 17:30:00',
        4,
        4,
        'Saída'
    ),
    (
        'Cuidados Pessoais',
        155,
        '2023-09-02 19:15:00',
        7,
        4,
        'Saída'
    ),
    (
        'Presentes',
        115,
        '2023-09-01 20:55:00',
        8,
        5,
        'Saída'
    ),
    (
        'Seguro de Saúde',
        165,
        '2023-09-02 08:00:00',
        10,
        5,
        'Saída'
    ),
    (
        'Viagem',
        125,
        '2023-09-01 09:30:00',
        5,
        6,
        'Saída'
    ),
    (
        'Lazer',
        175,
        '2023-09-02 10:45:00',
        11,
        6,
        'Saída'
    ),
    (
        'Veterinário',
        135,
        '2023-09-01 14:20:00',
        7,
        7,
        'Saída'
    ),
    (
        'Livros',
        185,
        '2023-09-02 16:10:00',
        4,
        7,
        'Saída'
    ),
    (
        'Roupas',
        145,
        '2023-09-01 11:05:00',
        9,
        8,
        'Saída'
    ),
    (
        'Assinatura Anual',
        195,
        '2023-09-02 13:45:00',
        1,
        8,
        'Saída'
    ),
    (
        'Supermercado',
        155,
        '2023-09-01 17:30:00',
        3,
        9,
        'Saída'
    ),
    (
        'Aluguel',
        205,
        '2023-09-02 19:15:00',
        2,
        9,
        'Saída'
    ),
    (
        'Transporte',
        165,
        '2023-09-01 20:55:00',
        6,
        10,
        'Saída'
    ),
    (
        'Presentes',
        215,
        '2023-09-02 08:00:00',
        8,
        10,
        'Saída'
    );