'use strict';

const Tipo = require('../models/tipos');

function getTipos(req,res)
{
    Tipo.findAll()
    .then((result)=>{
        res.status(200).send({result});
    })
    .catch((err)=> {
        res.status(500).send({message: 'Failed to retrieve ' + err});
    });
}

function svTipos(req,res)
{
    let tip = {
        tipo: req.body.tipo
    }
    Tipo.create(tip)
    .then(() => {
        res.status(200).send({message: 'Success'});
    })
    .catch(err => {
        res.status(500).send({message: 'Failed to save ' + err});
    });
}

function upTipos(req,res)
{
    let idTipo = req.params.id;
    let tip = {
        tipo: req.body.tipo
    }
    Tipo.findByPk(idTipo)
    .then((result) => {
        result.update(tip)
        .then(() => {
            res.status(200).send({message: 'Success'});
        })
        .catch(err => {
            res.status(500).send({message: 'Failed to update ' + err});    
        })
    })
    .catch(err => {
        res.status(404).send({message: 'Not found ' + err});
    })
}

function delTipos(req,res)
{
    let idTipo = req.params.id;

    Tipo.destroy({
        where:{
            id: idTipo
        }
    })
    .then(() => {
        res.status(200).send({message: 'Success'});
    })
    .catch(err => {
        res.status(500).send({message: 'Failed to delete ' + err});
    })
}

module.exports = {
    getTipos,
    svTipos,
    upTipos,
    delTipos
}