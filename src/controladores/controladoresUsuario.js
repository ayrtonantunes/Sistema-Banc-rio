const pool = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { senhaJwt } = require('../dadosSensiveis')


const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {

        const emailUsuario = await pool.query( 'select * from usuarios where email = $1', [email])

        console.log(emailUsuario.rows.length)

		if (emailUsuario.rows.length > 0) {
		    return res.status(404).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.' })
		}

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const novoUsuario = await pool.query('insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *',
            [nome, email, senhaCriptografada]
        )

        const usuarioSemSenha = { ...novoUsuario.rows[0] }
        delete usuarioSemSenha.senha

        return res.status(201).json(usuarioSemSenha)

    } catch (error) {
        // console.log(error.message)

        // if (error.message === 'duplicate key value violates unique constraint "usuarios_email_key"') {
        //     return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.'})
        // }
        
        return res.status(500).json({ mensagem: 'Erro interno do servidor'})
    }

}

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await pool.query('select * from usuarios where email = $1', [email])

        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.'})
        }

        if (usuario.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Usuário e/ou senha inválido(s).'})
        }

        const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha)

        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).'})
        }

        const token = jwt.sign({ id: usuario.rows[0].id, }, senhaJwt, { expiresIn: '1h' })

        const { senha: _, ...usuarioLogado } = usuario.rows[0]

        return res.status(200).json({ usuario: usuarioLogado, token })

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const detalharUsuario = async (req, res) => {
    const usuario = req.usuario
    const validarToken = req.headers.authorization

    if (!validarToken) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.'})
    }

    const usuarioSemSenha = { ...usuario }
    delete usuarioSemSenha.senha

    return res.json(usuarioSemSenha)
}

const atualizarUsuario = async (req, res) => {
	const { usuario } = req
	const { nome, email, senha } = req.body

	try {

        const emailUsuario = await pool.query( 'select * from usuarios where email = $1', [email])

		if (emailUsuario.rowCount > 0 && emailUsuario.rows.id !== usuario.id) {
		    return res.status(404).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.' })
		}

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const queryAtualizacao = 'update usuarios set nome = $1, email = $2, senha = $3 where id = $4'
        const parametroAtualizacao = [nome, email, senhaCriptografada, usuario.id]
        const usuarioAtualizacao = await pool.query(queryAtualizacao, parametroAtualizacao)

        if (usuarioAtualizacao.rowCount < 1) {
            return res.status(404).json({ mensagem: `Erro interno do servidor: ${error.message}`})
        }

		return res.status(204).send()
	} catch (error) {
		return res.status(500).json('Erro interno do servidor')
	}
}

module.exports = {
    cadastrarUsuario,
    login,
    detalharUsuario,
    atualizarUsuario
}