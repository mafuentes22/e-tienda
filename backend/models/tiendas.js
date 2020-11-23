'use strict';

const {DataTypes} = require('sequelize');
const sequelize = require('../database/database');
const Estado = require('../models/estados');
const Municipio = require('../models/municipios');
const Horario = require('../models/horarios');

const Tienda = sequelize.define('Tienda',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING
    },
    idEstado:{
        type: DataTypes.INTEGER,
        references: {
            model: Estado,
            key: 'id'
        }
    },
    idMunicipio:{
        type: DataTypes.INTEGER,
        references:{
            model: Municipio,
            key:'id'
        }
    },
    direccion:{
        type: DataTypes.STRING
    },
    telefono:{
        type: DataTypes.STRING
    },
    facebook:{
        type: DataTypes.STRING
    },
    instagram:{
        type: DataTypes.STRING
    },
    twitter:{
        type: DataTypes.STRING
    },
    idHorario:{
        type: DataTypes.INTEGER,
        references:{
            model: Horario,
            key: 'id'
        }
    }
},
{
    tableName: 'tiendas'
})

module.exports = Tienda;