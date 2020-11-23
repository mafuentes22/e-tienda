'use strict';

let express = require('express');
let api = express.Router();

let MunicipiosController = require('../controllers/municipios');

api.get('/municipios/:idEstado', MunicipiosController.getMunicipios);

module.exports = api;