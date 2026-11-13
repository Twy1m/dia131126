const conn = require('../db/conn')
const { DataTypes } = require('sequelize')

const Material = conn.define('material', {
    codMaterial: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qtdEstoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lote: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idObra: {
        type: DataTypes.INTEGER,
        references: {
            model: 'obras',
            key: 'codObra'
        }
    },
}, {
    tableName: 'materials',
    timestamps: false
})


module.exports = Material