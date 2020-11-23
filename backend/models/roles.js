'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Rol = sequelize.define('Rol',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol:{
        type: DataTypes.STRING
    }
},
{
    tableName:'roles'
})

module.exports = Rol;