const pool = require('../conexao')

const listarTransacoes = async (req, res) => {
    const { id } = req.usuario
    const { filtro } = req.query

    try {

        const consultaSql = `
        SELECT transacoes.*, categorias.descricao AS categoria_nome
        FROM transacoes
        INNER JOIN categorias ON transacoes.categoria_id = categorias.id
        WHERE usuario_id = $1`

        const consulta = await pool.query(consultaSql, [id])

        if (!filtro) {
            return res.status(200).json(consulta.rows)
        }

        const categorias = await pool.query(`
            SELECT descricao FROM categorias
        `)

        const categoriasEncontradas = categorias.rows.filter((transacao) => {
            return filtro.includes(transacao.descricao)
        })

        
        if (categoriasEncontradas.length === 0) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada.'})
        }
        
        const resultadoFiltro = consulta.rows.filter((transacao) => {
            return filtro.includes(transacao.categoria_nome)
        })
        
        if (categoriasEncontradas.length !== filtro.length || categoriasEncontradas.length === 0) {
            return res.status(404).json({ mensagem: 'Categoria(s) inválida(s). Tente novamente digitando somente categorias válidas.'})
        };

        if (resultadoFiltro.length > 0) {
            return res.status(200).json(resultadoFiltro)
        } else {
            return res.status(404).json({ mensagem: 'Nenhuma transação para esta categoria.'})
        }
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const listarCategorias = async (req, res) => {

    try {
        const usuario_id = req.usuario.id

        const consulta = `
        SELECT categorias.* 
        FROM categorias
        INNER JOIN transacoes ON categorias.id = transacoes.categoria_id
        WHERE transacoes.usuario_id = $1
        ORDER BY categorias.id`

        const listagemCategorias = await pool.query(consulta, [usuario_id])


        return res.status(200).json(listagemCategorias.rows)
    } catch (error) {
        return res.status(500).json({ mensasgem: 'Erro interno do servidor.' })
    }
}

const detalharTransacao = async (req, res) => {

    try {
        const usuario_id = req.usuario.id
        const transacao_id = req.params.id

        const transacaoEncontrada = await pool.query(`
                SELECT transacoes.*, categorias.descricao AS categoria_nome 
                FROM transacoes
                INNER JOIN categorias ON categorias.id = transacoes.categoria_id
                WHERE transacoes.usuario_id = $1 AND transacoes.id = $2`, [usuario_id, transacao_id])

        if (transacaoEncontrada.rows < 1) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' })
        }

        return res.status(200).json(transacaoEncontrada.rows[0])
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensasgem: 'Erro interno do servidor.' })
    }
}

const cadastrarTransacao = async (req, res) => {
    try {
        const usuario_id = req.usuario.id
        const { descricao, valor, data, categoria_id, tipo } = req.body

        const cadastroTransacao = `
            INSERT INTO transacoes (
                descricao,
                valor,
                data,
                categoria_id,
                usuario_id,
                tipo
            )
            VALUES
                ($1, $2, $3, $4, $5, $6);
        `

        await pool.query(cadastroTransacao, [descricao, valor, data, categoria_id, usuario_id, tipo])

        const transacaoCadastrada = await pool.query(`
            SELECT transacoes.*, categorias.descricao AS categoria_nome 
            FROM transacoes
            INNER JOIN categorias ON categorias.id = transacoes.categoria_id
            WHERE transacoes.usuario_id = $1
            ORDER BY transacoes.id DESC
            LIMIT 1`, [usuario_id])

        return res.status(201).json(transacaoCadastrada.rows[0])
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const atualizarTransacao = async (req, res) => {

    try {
        const usuario_id = req.usuario.id
        const transacao_id = req.params.id
        const { descricao, valor, data, categoria_id, tipo } = req.body

        const transacaoEncontrada = await pool.query(`
        SELECT transacoes.*, categorias.descricao AS categoria_nome 
        FROM transacoes
        INNER JOIN categorias ON categorias.id = transacoes.categoria_id
        WHERE transacoes.usuario_id = $1 AND transacoes.id = $2`, [usuario_id, transacao_id])

        if (transacaoEncontrada.rows < 1) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' })
        }

        await pool.query(`
        UPDATE transacoes
        SET
          descricao = $1,
          valor = $2,
          data = $3,
          categoria_id = $4,
          tipo = $5
        WHERE
          id = $6 AND usuario_id = $7;`, [descricao, valor, data, categoria_id, tipo, transacao_id, usuario_id])

        return res.status(204).send()
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensasgem: 'Erro interno do servidor.' })
    }
}

const excluirTransacao = async (req, res) => {
    const transacao_id = req.params.id
    const usuario_id = req.usuario.id

    try {

        const transacaoEncontrada = await pool.query(`
                SELECT transacoes.*, categorias.descricao AS categoria_nome 
                FROM transacoes
                INNER JOIN categorias ON categorias.id = transacoes.categoria_id
                WHERE transacoes.usuario_id = $1 AND transacoes.id = $2`, [usuario_id, transacao_id])

        if (transacaoEncontrada.rows < 1) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' })
        }

        await pool.query('delete from transacoes where id = $1', [transacao_id])

        return res.status(204).send()
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const emitirExtratoTransacao = async (req, res) => {

    try {
        const usuario_id = req.usuario.id

        const consultarExtratoTransacoes = `
        SELECT
            SUM(CASE WHEN tipo ILIKE 'Entrada' THEN valor ELSE 0 END) AS entrada,
            SUM(CASE WHEN tipo ILIKE 'Saída' THEN valor ELSE 0 END) AS saida
        FROM transacoes
        WHERE usuario_id = $1
        `
        const extrtoTransacoes = await pool.query(consultarExtratoTransacoes, [usuario_id])

        if (extrtoTransacoes.rows[0].entrada === null) {

            extrtoTransacoes.rows[0].entrada = 0
        }

        if (extrtoTransacoes.rows[0].saida === null) {

            extrtoTransacoes.rows[0].saida = 0
        }
        return res.status(200).json(extrtoTransacoes.rows[0])

    } catch (error) {

    }
}


module.exports = {
    listarTransacoes,
    listarCategorias,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    excluirTransacao,
    emitirExtratoTransacao,
 
}

//Validar Detalhar transação : Resposta => transação não encontrada.