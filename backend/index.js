const express = require('express')
const cors = require('cors')
const app = express()

const authMiddleware = require('./middleware/auth.middleware')
const funcionarioController = require('./controller/funcionario.controller')
const obraController = require('./controller/obra.controller')
const materialController = require('./controller/material.controller')
const movimentoController = require('./controller/movimento.controller')
const authController = require('./controller/auth.controller')

const hostname = 'localhost'
const port = 3000

//MIDLEWARE

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())

//ROTAS

app.post('/login', authController.login)
app.post('/funcionario', funcionarioController.cadastrar)

app.use(authMiddleware)

app.post('/obra', obraController.cadastrar)
app.get('/obras', obraController.listar)
app.get('/obra/id/:id', obraController.buscarID)
app.get('/obra/nome/:nome', obraController.buscarNome)
app.patch('/obra/:id', obraController.atualizar)
app.delete('/obra/:id', obraController.apagar)

app.post('/material', materialController.cadastrar)
app.patch('/material/:id', materialController.atualizar)

app.post('/movimento', movimentoController.cadastrar)
app.get('/movimentos', movimentoController.listar)

app.listen(port, hostname, ()=>{
    console.log(`servidor rodando em http://${hostname}:${port}`);
})