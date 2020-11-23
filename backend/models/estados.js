'use strict';

const { DataTypes } = require('sequelize');
let sequelize = require('../database/database');

const Estado = sequelize.define('Estado', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.STRING
    }
},
{
    tableName: 'estados'
})

module.exports = Estado;