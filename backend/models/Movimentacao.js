const conn = require('../db/conn')
const { DataTypes } = require('sequelize')

const Movimentacao = conn.define('movimentacao', {
    codMovimentacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.ENUM("ENTRADA", "SAIDA"),
        allowNull: false
    },
    qtdMovimento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    idMaterial: {
        type: DataTypes.INTEGER,
        references: {
            model: 'materials',
            key: 'codMaterial'
        }
    },
}, {
    tableName: 'movimentacaos',
    timestamps: false
})


module.exports = Movimentacao