'use strict';

const express = require('express');
const api = express.Router();
const PedidoController = require('../controllers/pedidos');

api.get('/pedido/:id', PedidoController.getPedidos);
api.get('/pedido', PedidoController.getPedidos);
api.get('/detalle/:id', PedidoController.getPedidosDet);
api.post('/pedido', PedidoController.svPedido);

module.exports = api;