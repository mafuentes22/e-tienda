'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const PedidoH = require('./pedidosH');
const Producto = require('./productos');

const PedidoD = sequelize.define('PedidoD',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idPedido:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: PedidoH,
            key:'id'
        }
    },
    idProducto:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Producto,
            key: 'id'
        }
    },
    precioU: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
},{
    tableName: 'pedidosDet'
})

module.exports = PedidoD;