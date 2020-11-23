'use strict';

const {DataTypes} = require('sequelize');
let sequelize = require('../database/database');
const Estado = require('./estados');

const Municipio = sequelize.define('Municipio',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idEstado:{
        type: DataTypes.INTEGER,
        references:{
            model: Estado,
            key: 'id'
        }
    },
    municipio:{
        type: DataTypes.STRING
    }
},
{
    tableName: 'municipios'
})

module.exports = Municipio;