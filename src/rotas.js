const express = require('express')

const { cadastrarUsuario, login, detalharUsuario, atualizarUsuario } = require('./controladores/controladoresUsuario')
const verificarUsuarioLogado = require('./intermediarios/autenticacao')
const validarCamposUsuario = require('./intermediarios/intermediariosUsuario')
const checarCadastroTransacao = require('./intermediarios/intermediariosTransacoes')
const {
    listarTransacoes,
    listarCategorias,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    emitirExtratoTransacao, 
    excluirTransacao,
    } = require('./controladores/controladoresTransacoes')

const rotas = express()

rotas.post('/usuario', validarCamposUsuario, cadastrarUsuario)
rotas.post('/login', login)

rotas.use(verificarUsuarioLogado)

rotas.get('/perfil', detalharUsuario)
rotas.put('/usuario', validarCamposUsuario, atualizarUsuario)

rotas.put('/transacao', cadastrarTransacao)
rotas.get('/transacao', listarTransacoes)
rotas.get('/categorias', listarCategorias)
rotas.put('/transacao/:id', checarCadastroTransacao, atualizarTransacao)
rotas.delete('/transacao/:id', excluirTransacao)
rotas.get('/transacao/extrato', emitirExtratoTransacao)
rotas.get('/transacao/:id', detalharTransacao)
rotas.post('/transacao', checarCadastroTransacao, cadastrarTransacao)
 

module.exports = rotas
