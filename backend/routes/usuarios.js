'use strict';

const express = require('express');
const api = express.Router();
const UsuarioController = require('../controllers/usuarios');

api.get('/usuarios/:id', UsuarioController.getUsuarios);
api.get('/usuarios', UsuarioController.getUsuarios);
api.post('/usuarios', UsuarioController.svUsuario);
api.put('/usuarios/:id', UsuarioController.upUsuario);
api.delete('/usuarios/:id', UsuarioController.delUsuario);
api.post('/login', UsuarioController.login);

module.exports = api;