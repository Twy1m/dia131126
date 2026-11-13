const Obra = require('../models/Obra')
const CryptoJS = require('crypto-js')

const cadastrar = async (req, res) => {
    let { nome, cnpj } = req.body

    if (!nome || !cnpj) {
        return res.status(400).json({ message: 'preencha todos os campos' })
    }

    try {
        cnpj = CryptoJS.AES.encrypt(cnpj, "senha").toString()

        await Obra.create({
            nome: nome,
            cnpj: cnpj
        })

        res.status(201).json({ message: 'Obra cadastrado com sucesso' })
    } catch (err) {
        res.status(500).json({ message: 'erro ao cadastrar' })
        console.error(err)
    }
}

const listar = async(req,res)=>{
    try{
        let obra = await Obra.findAll()

        obra.forEach( el =>{
            el.cnpj = CryptoJS.AES.decrypt(el.cnpj, "senha").toString(CryptoJS.enc.Utf8)
        })

        res.status(200).json(obra)
    }catch(err){
        res.status(500).json({ message: 'erro ao listar' })
        console.error(err)
    }

}

const buscarID = async(req,res)=>{
    let id = req.params.id

    if (!id) {
        return res.status(400).json({ message: 'preencha todos os campos' })
    }

    try{
        let obra = await Obra.findByPk(id)

        if (!obra) {
            return res.status(404).json({ message: 'obra não encontrada' })
        }

        obra.cnpj = CryptoJS.AES.decrypt(obra.cnpj, "senha").toString(CryptoJS.enc.Utf8)
        res.status(200).json(obra)
    }catch(err){
        res.status(500).json({ message: 'erro ao buscar' })
        console.error(err)
    }

}

const buscarNome = async(req,res)=>{
    let nome = req.params.nome

    if (!nome) {
        return res.status(400).json({ message: 'preencha todos os campos' })
    }

    try{
        let obra = await Obra.findOne({where: {nome:nome}})

        if (!obra) {
            return res.status(404).json({ message: 'obra não encontrada' })
        }

        obra.cnpj = CryptoJS.AES.decrypt(obra.cnpj, "senha").toString(CryptoJS.enc.Utf8)
        res.status(200).json(obra)
    }catch(err){
        res.status(500).json({ message: 'erro ao buscar' })
        console.error(err)
    }

}

const atualizar = async(req,res)=>{
    let id = req.params.id
    let { nome, cnpj } = req.body


    if (!id) {
        return res.status(400).json({ message: 'preencha todos os campos' })
    }

    try{
        let obra = await Obra.findByPk(id)

        if (!obra) {
            return res.status(404).json({ message: 'obra não encontrada' })
        }
        cnpj = CryptoJS.AES.encrypt(cnpj, "senha").toString()

        obra.nome = nome
        obra.cnpj = cnpj

        await obra.save()

        res.status(200).json({
            message: 'obra atualizada com sucesso'
        })
    }catch(err){
        res.status(500).json({ message: 'erro ao atualizar' })
        console.error(err)
    }

}

const apagar = async(req,res)=>{
    let id = req.params.id

    if (!id) {
        return res.status(400).json({ message: 'preencha todos os campos' })
    }

    try{
        let obra = await Obra.findByPk(id)

        if (!obra) {
            return res.status(404).json({ message: 'obra não encontrada' })
        }

        await obra.destroy()

        res.status(200).json({
            message: 'obra apagada com sucesso'
        })
    }catch(err){
        res.status(500).json({ message: 'erro ao apagar' })
        console.error(err)
    }

}
module.exports = { cadastrar, listar, buscarID, buscarNome, atualizar, apagar }