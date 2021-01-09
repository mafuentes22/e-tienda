'use strict';

const express = require('express');
const api = express.Router();
const TipoController = require('../controllers/tipos');

api.get('/tipos', TipoController.getTipos);
api.post('/tipos', TipoController.svTipos);
api.put('/tipos/:id', TipoController.upTipos);
api.delete('/tipos/:id', TipoController.delTipos);

module.exports = api;