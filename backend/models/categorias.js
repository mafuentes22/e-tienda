'use strict';
const { DataTypes } = require('sequelize');
let sequelize = require('../database/database');

const Categoria = sequelize.define('Categoria',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria:{
        type: DataTypes.STRING
    }
},
{
    tableName: 'categorias'
})

module.exports = Categoria;