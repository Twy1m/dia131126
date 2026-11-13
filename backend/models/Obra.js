const conn = require('../db/conn')
const { DataTypes } = require('sequelize')

const Obra = conn.define('obra', {
    codObra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'obras',
    timestamps: false
})


module.exports = Obra