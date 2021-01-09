'use strict';

const Horario = require('../models/horarios');
const Tienda = require('../models/tiendas');

function getTiendas(req,res)
{
    const idTienda = req.params.id;
    if(idTienda)
    {
        Tienda.findByPk(idTienda)
        .then(result => {
            res.status(200).send({result});
        })
        .catch(err => {
            res.status(500).send({message: 'Error to retrieve '+err});
        });
    }
    else
    {
        Tienda.findAll()
        .then(result => {
            res.status(200).send({result});
        })
        .catch(err => {
            res.status(500).send({message: 'Error to retrieve '+err});
        });
    }
}

function svTienda(req,res)
{
    const tienda = {
        nombre: req.body.nombre,
        idEstado: req.body.idEstado,
        idMunicipio: req.body.idMunicipio,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        idHorario: req.body.idHorario
    }

    Tienda.create(tienda)
    .then(result => {
        res.status(200).send({message: 'Success'});
    })
    .catch(err => {
        res.status(500).send({message: 'Cannot save ' + err});
    })
}

function upTienda(req,res)
{
    const idTienda = req.params.id;
    const tienda = {
        nombre: req.body.nombre,
        idEstado: req.body.idEstado,
        idMunicipio: req.body.idMunicipio,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter
    }

    Tienda.findByPk(idTienda)
    .then(result => {
        result.update(tienda)
        .then(resu => {
            res.status(200).send({message: 'Success'});
        })
        .catch(err => {
            res.status(500).send({message: 'Failed to update ' + err});
        });
    })
    .catch(err => {
        res.status(400).send({message: 'Failed to get ' + err})
    });
}

function delTienda(req,res)
{
    const idTienda = req.params.id;
    // Borrar tambien los horarios asociados a la tienda
    Horario.destroy({
        where:{
            idTienda: idTienda
        }
    })
    .then(() => {
        Tienda.destroy({
            where:{
                id: idTienda
            }
        })
        .then(()=> {
            res.status(200).send({message: 'Success'});
        })
        .catch(err => {
            res.status(500).send({message: 'Failed to delete ' + err});
        })
    })
    .catch(err => {
        res.status(500).send({message: 'Failed to delete ' + err});
    });

}

module.exports = {
    getTiendas,
    svTienda,
    upTienda,
    delTienda
}