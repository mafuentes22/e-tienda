'use strict';

const Rol = require('../models/roles');

function getRoles(req,res)
{
    Rol.findAll()
    .then((result) => {
        res.status(200).send({result});
    })
    .catch((err) => {
        res.status(500).send({message:'Failed to retrieve ' + err});
    })
}

function svRoles(req,res)
{
    const nRol = {
        rol: req.body.rol
    }

    Rol.create(nRol)
    .then(() => {
        res.status(200).send({message: 'Success'});
    })
    .catch((err) => {
        res.status(500).send({message: 'Failed to save ' + err});
    });
}

function upRoles(req,res)
{
    const idRol = req.params.id;
    const nRol = {
        rol: req.body.rol
    }

    Rol.findByPk(idRol)
    .then(rol => {
        rol.update(nRol)
        .then(() => {
            res.status(200).send({message: 'Success'});
        })
        .catch(err => {
            res.status(500).send({message: 'Failed to update ' + err});
        })
    })
    .catch(err => {
        res.status(404).send({message: 'Not found ' + err});
    });
}

function delRoles(req,res)
{
    const idRol = req.params.id;

    Rol.destroy({
        where: {
            id: idRol
        }
    })
    .then(() => {
        res.status(200).send({message: 'Success'});
    })
    .catch(err => {
        res.status(500).send({message: 'Failed to delete ' + err});
    });
}

module.exports = {
    getRoles,
    svRoles,
    upRoles,
    delRoles
}