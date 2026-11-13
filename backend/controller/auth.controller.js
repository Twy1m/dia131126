const CryptoJS = require('crypto-js')
const Funcionario = require('../models/Funcionario')

const login = async (req, res) => {
    let { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({ message: 'preencha todos os campos' })
    }

    try {
        let funcionario = await Funcionario.findOne({ where: {email:email}})
        if (!funcionario) {
            return res.status(404).json({ message: 'funcionario não encontrado' })
        }

        funcionario.senha = CryptoJS.AES.decrypt(funcionario.senha, "senha").toString(CryptoJS.enc.Utf8)

        if(senha !== funcionario.senha){
            return res.status(400).json({ message: 'credenciais invalidas' })
        }

        const duracao = 180 * 60 * 1000
        let expiracao = Date.now() + duracao

        let payload = CryptoJS.AES.encrypt(JSON.stringify({
            expiraEm: expiracao
        }), "senha").toString()

        res.status(200).json({
             token: payload,
             nome: funcionario.nome,
             message: 'Bem vindo, login realizado com sucesso!'
            })
    } catch (err) {
        res.status(500).json({ message: 'erro ao logar' })
        console.error(err)
    }
}
module.exports = { login }