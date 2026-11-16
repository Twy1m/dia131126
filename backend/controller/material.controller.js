const Material = require('../models/Material')
const Obra = require('../models/Obra')
const CryptoJS = require('crypto-js')

const cadastrar = async (req, res) => {
    let { descricao, categoria, qtdEstoque, lote, idObra } = req.body

    if (!descricao || !categoria || !qtdEstoque || !lote || !idObra) {
        return res.status(400).json({ message: 'preencha todos os campos' })
    }

    try {
        lote = CryptoJS.AES.encrypt(lote, "senha").toString()

        await Material.create({
            descricao: descricao,
            categoria: categoria,
            qtdEstoque: qtdEstoque,
            lote: lote,
            idObra: idObra
        })

        res.status(201).json({ message: 'Material cadastrado com sucesso' })
    } catch (err) {
        res.status(500).json({ message: 'erro ao cadastrar' })
        console.error(err)
    }
}

const atualizar = async (req, res) => {
    let id = req.params.id
    let { descricao, categoria, qtdEstoque, lote, idObra } = req.body


    if (!id) {
        return res.status(400).json({ message: 'preencha todos os campos' })
    }

    try {
        console.log(id)
        console.log(idObra)
        let material = await Material.findByPk(id)
        if (!material) {
            return res.status(404).json({ message: 'Material não encontrada' })
        }

        let obra = await Obra.findByPk(idObra)
        if (!obra) {
            return res.status(404).json({ message: 'Obra não encontrada' })
        }


        lote = CryptoJS.AES.encrypt(lote, "senha").toString()

        material.descricao = descricao
        material.categoria = categoria
        material.qtdEstoque = qtdEstoque
        material.lote = lote
        material.idObra = idObra


        await material.save()

        res.status(200).json({
            message: 'Material atualizada com sucesso'
        })
    } catch (err) {
        res.status(500).json({ message: 'erro ao atualizar' })
        console.error(err)
    }

}

module.exports = { cadastrar, atualizar }