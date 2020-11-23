'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Tienda = require('../models/tiendas');
const Tipo = require('../models/tipos');
const Rol = require('../models/roles');

const Usuario = sequelize.define('Usuario',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: true
    },
    idTienda:{
        type: DataTypes.INTEGER,
        references: {
            model: Tienda,
            key: 'id'
        }
    },
    idTipo:{
        type: DataTypes.INTEGER,
        references:{
            model: Tipo,
            key:'id'
        }
    },
    idRol:{
        type: DataTypes.INTEGER,
        references:{
            model: Rol,
            key: 'id'
        }
    },
    fechaAlta:{
        type: DataTypes.DATE
    }
},
{
    tableName: 'usuarios'
})

module.exports = Usuario;