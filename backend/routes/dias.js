'use strict';

let express = require('express');
let api = express.Router();

const DiasController = require('../controllers/dias');

api.get('/dias', DiasController.getDias);

module.exports = api;