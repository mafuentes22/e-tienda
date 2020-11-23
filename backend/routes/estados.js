'use strict';

let EstadoController = require('../controllers/estados');

let express = require('express');
let api = express.Router();

api.get('/estados/:idEstado', EstadoController.getEstado);
api.get('/estados',EstadoController.getEstados);

module.exports = api;