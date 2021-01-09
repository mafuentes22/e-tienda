'use strict';

const Horario = require('../models/horarios');

function getHorario(req, res)
{
    // Permite buscar los horarios de una tienda en especifico
    const idT = req.params.id;
    Horario.findAll({
        where:{
            idTienda: idT
        }
    })
    .then((result)=>{
        res.status(200).send({result});
    })
    .catch((err) => {
        res.status(500).send({message:'Error to retrieve ' + err});
    })
}

function svHorario(req, res)
{
    Horario.create({
        idTienda: req.body.idTienda,
        horaEnt: req.body.horaE,
        horaSal: req.body.horaS,
        idDia: req.body.idDia
    })
    .then(()=>{
        res.status(200).send({message: 'Success'});
    })
    .catch((err)=>{
        res.status(500).send({message: 'Failed to insert ' + err});
    });
}

function upHorario(req, res)
{
    const idHor = req.params.id;
    let hor = {
        horaEnt: req.body.horaE,
        horaSal: req.body.horaS,
        idDia: req.body.idDia
    }
    Horario.findByPk(idHor).
    then(horar => {
        horar.update(hor)
        .then(result => {
            res.status(200).send({message: 'Success'});
        })
        .catch(err => {
            res.status(500).send({message: 'Failed to update ' + err});
        })
    })
    .catch(err => {
        res.status(404).send({message: 'Failed to get ' + err});
    })
}

function delHorario(req,res)
{
    const idHor = req.params.id;
    Horario.destroy({
        where:{
            id: idHor
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
    getHorario,
    svHorario,
    upHorario,
    delHorario
}