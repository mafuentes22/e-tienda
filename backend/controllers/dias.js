'use strict';

const Dia = require('../models/dias');

function getDias(req,res)
{
    Dia.findAll()
    .then((result)=>{
        res.status(200).send({result});
    })
    .catch(err => {
        res.status(500).send({message: 'Error to retrieve ' + err});
    })
}

module.exports = {
    getDias
}