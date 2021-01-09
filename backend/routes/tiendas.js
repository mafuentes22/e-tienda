'use strict';

const express = require('express');
const api = express.Router();
const TiendaController = require('../controllers/tiendas');

api.get('/tiendas/:id', TiendaController.getTiendas);
api.get('/tiendas', TiendaController.getTiendas);
api.post('/tiendas', TiendaController.svTienda);
api.put('/tiendas/:id', TiendaController.upTienda);
api.delete('/tiendas/:id', TiendaController.delTienda)

module.exports = api;