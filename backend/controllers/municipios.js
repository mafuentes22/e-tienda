'use strict';
let Municipio = require('../models/municipios');

function getMunicipios(req, res)
{
    let idE = req.params.idEstado;
    Municipio.findAll({
        where: {
            idEstado: idE
        }
    })
    .then(result => 
        {
            res.status(200).send({result});
        })
    .catch(err => 
        {
            res.status(500).send({message: 'Error to retrieve ' + err});
        })
}

module.exports = {
    getMunicipios
}