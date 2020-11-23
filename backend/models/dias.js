'use strict';

const { DataTypes } = require('sequelize');
let sequelize = require('../database/database');

const Dia = sequelize.define('Dia',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    caracter:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dia: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: 'dias'
})

module.exports = Dia;