'use strict';

let express = require('express');
let api = express.Router();

let CategoriasController = require('../controllers/categorias');

api.get('/categorias/:idCat', CategoriasController.getCategorias);
api.get('/categorias', CategoriasController.getCategorias);
api.post('/categorias', CategoriasController.svCategoria);
api.delete('/categorias/:idCat', CategoriasController.delCategoria);

module.exports = api;