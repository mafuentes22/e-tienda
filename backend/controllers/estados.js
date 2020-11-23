'use strict'
let Estado = require('../models/estados');

function getEstados(req, res)
{
    Estado.findAll()
    .then(estados => 
        {
            res.status(200).send({estados});
        })
    .catch(err => 
        {
            res.status(500).send({message: 'Error to retrieve ' + err});
        })
}

function getEstado(req, res)
{
    const idEstado = req.params.idEstado;
    console.log('Estado ' + idEstado);

    Estado.findByPk(idEstado)
    .then(estados => 
        {
            res.status(200).send({estados});
        })
    .catch(err => 
        {
            res.status(500).send({message: 'Error to retrieve ' + err});
        })
}

module.exports = {
    getEstados,
    getEstado
}