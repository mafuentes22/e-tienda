'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Tienda = require('./tiendas');
const Categoria = require('./categorias');

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING
    },
    idTienda:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Tienda,
            key: 'id'
        }
    },
    idCategoria:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Categoria,
            id: 'id'
        }
    }
},
{
    tableName: 'productos'
})

module.exports = Producto;