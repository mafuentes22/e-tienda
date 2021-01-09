'use strict';

const { DataTypes } = require('sequelize');
let sequelize = require('../database/database');
const Dia = require('../models/dias');
const Tienda = require('../models/tiendas');

const Horario = sequelize.define('Horario',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idTienda:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Tienda,
            key: 'id'
        }
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