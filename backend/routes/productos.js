'use strict';

const express = require('express');
const api = express.Router();
const ProductoController = require('../controllers/productos');
const upload = require('../middleware/upload');

api.get('/productos/:id',   ProductoController.getProductos);
api.get('/producto/:id',    ProductoController.getProducto);
api.get('/producto',        ProductoController.getProducto);
api.post('/producto', upload, ProductoController.svProducto);
api.put('/producto/:id', upload,    ProductoController.upProducto);
api.delete('/producto/:id', ProductoController.delProducto);

module.exports = api;