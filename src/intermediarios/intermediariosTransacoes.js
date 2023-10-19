
const checarCadastroTransacao = async (req, res, next) => {
    const corpoTransacao = req.body
    const camposPendentes = []

    const camposObrigatorios = [
        'descricao',
        'valor',
        'data',
        'categoria_id',
        'tipo'
    ]

    if (Object.keys(corpoTransacao).length === 0) {
        return res.status(400).json({
            mensagem: 'Todos os campos obrigatórios devem ser informados.', camposObrigatorios
        });
    }

    for (let campo of camposObrigatorios) {
        if (!(campo in corpoTransacao)) {
            camposPendentes.push(campo)
        }
    }

    if (camposPendentes.length > 0) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos.', camposPendentes })
    }

    next()
}

module.exports = checarCadastroTransacao