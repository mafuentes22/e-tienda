'use strict';

const sequelize = require('../database/database');
const { DataTypes } = require('sequelize');
const Tienda = require('./tiendas');
const Usuario = require('./usuarios');

const UsuarioTienda = sequelize.define('UsuarioTienda', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Usuario,
            key: 'id'
        }
    },
    idTienda: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tienda,
            key: 'id'
        }
    }
},
{
    tableName: 'usuarios_tienda'
});

module.exports = UsuarioTienda;