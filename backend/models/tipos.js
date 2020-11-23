'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Tipo = sequelize.define('Tipo',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo:
    {
        type:DataTypes.STRING
    }
},{
    tableName:'tipoUsuario'
})

module.exports = Tipo;