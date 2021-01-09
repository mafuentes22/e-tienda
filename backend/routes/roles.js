'use strict';

const express = require('express');
const api = express.Router();

const RolController = require('../controllers/roles');

api.get('/roles', RolController.getRoles);
api.post('/roles', RolController.svRoles);
api.put('/roles/:id', RolController.upRoles);
api.delete('/roles/:id', RolController.delRoles);

module.exports = api;