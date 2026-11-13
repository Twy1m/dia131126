const Movimentacao = require('../models/Movimentacao')

const cadastrar = async (req, res) => {
    let { estado, qtdMovimento, data, idMaterial } = req.body

    if (!estado || !qtdMovimento || !data || !idMaterial) {
        return res.status(400).json({ message: 'preencha todos os campos' })
    }

    try {

        await Movimentacao.create({
            estado: estado,
            qtdMovimento: qtdMovimento,
            data: data,
            idMaterial: idMaterial,
        })

        res.status(201).json({ message: 'Movimentacao cadastrado com sucesso' })
    } catch (err) {
        res.status(500).json({ message: 'erro ao cadastrar' })
        console.error(err)
    }
}

const listar = async (req, res) => {
    try {
        let movimento = await Movimentacao.findAll({ order: [['data', 'ASC']]})

        res.status(200).json(movimento)
    } catch (err) {
        res.status(500).json({ message: 'erro ao listar' })
        console.error(err)
    }

}

module.exports = { cadastrar, listar }