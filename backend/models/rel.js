const Funcionario = require('./Funcionario')
const Obra = require('./Obra')
const Material = require('./Material')
const Movimentacao = require('./Movimentacao')

Obra.hasMany(Material, {
    foreignKey: 'idObra',
    as: "MaterialObra",
    onDelete: "CASCADE"
})

Material.belongsTo(Obra, {
    foreignKey: 'idObra',
    as: "ObraMaterial",
    allowNull: false
})

Material.hasMany(Movimentacao, {
    foreignKey: 'idMaterial',
    as: "MovimentacaoMaterial",
    onDelete: "CASCADE"
})

Movimentacao.belongsTo(Material, {
    foreignKey: 'idMaterial',
    as: "MaterialMovimentacao",
    allowNull: false
})

module.exports = { Funcionario, Obra, Material, Movimentacao}