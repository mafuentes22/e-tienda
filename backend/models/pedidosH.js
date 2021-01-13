'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const PedidoD = require('./pedidosD');
const Tienda = require('./tiendas');
const Usuario = require('./usuarios');

const PedidoH = sequelize.define('PedidoH', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idTienda:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: Tienda,
            key:'id'
        }
    },
    idUsuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Usuario,
            key: 'id'
        }
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    tableName: 'pedidosH'
})

PedidoH.Detalle = PedidoH.hasMany(PedidoD, {foreignKey: 'idPedido', as: 'Detalle'});

module.exports = PedidoH;