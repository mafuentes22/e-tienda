'use strict';

const { DataTypes } = require('sequelize');
let sequelize = require('../database/database');
const Dia = require('../models/dias');

const Horario = sequelize.define('Horario',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    horaEnt: 
    {
        type: DataTypes.TIME,
        allowNull: false
    },
    horaSal:
    {
        type: DataTypes.TIME,
        allowNull: false
    },
    idDia:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Dia,
            key: 'id'
        }
    }
},
{
    tableName: 'horarios'
})

module.exports = Horario;