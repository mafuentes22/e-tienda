'use strict';

let express = require('express');
let api = express.Router();

const HorarioController = require('../controllers/horarios');

api.get('/horarios/:id', HorarioController.getHorario);
api.post('/horarios', HorarioController.svHorario);
api.put('/horarios/:id', HorarioController.upHorario);
api.delete('/horarios/:id', HorarioController.delHorario);

module.exports = api;