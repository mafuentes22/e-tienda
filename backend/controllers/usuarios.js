'use strict';

const moment = require('moment');
const Usuario = require('../models/usuarios');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function getUsuarios(req,res)
{
    const idUsu = req.params.id;
    if(idUsu)
    {
        Usuario.findByPk(idUsu)
        .then(result => {
            res.status(200).send({result});
        })
        .catch(err => {
            res.status(500).send({message: 'Failed to retrieve ' + err});
        });
    }
    else
    {
        Usuario.findAll()
        .then(result => {
            res.status(200).send({result});
        })
        .catch(err => {
            res.status(500).send({message: 'Failed to retrieve ' + err});
        });
    }
}

function svUsuario(req,res)
{
    // Restandole el offset a la fecha para que sequelize le sume el offset y asi obtener
    // el datetime en local
    let fecha = moment().add(moment().utcOffset() / 60, 'hours');

    // Manejo de la contraseña encriptada
    let contrasena = req.body.contrasena;

    if(contrasena)
    {
        bcrypt.hash(contrasena, null, null, (err, contraEnc) => {

            const usu = {
                usuario: req.body.usuario,
                nombre: req.body.nombre,
                contrasena: contraEnc,
                idTipo: req.body.idTipo,
                idRol: req.body.idRol,
                fechaAlta: fecha
            }

            Usuario.create(usu)
            .then(() => {
                res.status(200).send({message: 'Success'});
            })
            .catch(err => {
                res.status(500).send({message: 'Failed to save ' + err});
            });
        });
    }
    else
        res.status(500).send({message: 'Password field is empty'});
}

function upUsuario(req,res)
{
    const idUsu = req.params.id;

    // Agregar proximamente que el usuario pueda subir una imagen de perfil
    
    let contrasena = req.body.contrasena;
    
    bcrypt.hash(contrasena, null, null, (err, contraEnc) => {
        const usu = {
            usuario: req.body.usuario,
            nombre: req.body.nombre,
            contrasena: contraEnc,
            idTienda: req.body.idTienda,
            idTipo: req.body.idTipo,
            idRol: req.body.idRol
        }
        Usuario.findByPk(idUsu)
        .then(result => {
            result.update(usu)
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
    })

}

function delUsuario(req,res)
{
    const idUsu = req.params.id;

    Usuario.destroy({
        where:{
            id: idUsu
        }
    })
    .then(() => {
        res.status(200).send({message: 'Success'});
    })
    .catch(err => {
        res.status(500).send({message: 'Failed to delete ' + err});
    })
}

function login(req,res)
{
    const user = req.body.usuario;
    const pass = req.body.contrasena;

    Usuario.findOne({
        where:{
            usuario: user
        }
    })
    .then(result => {        
        if(result)
        {
            bcrypt.compare(pass, result.contrasena,(err, check) => {
                if(check)
                {
                    res.status(200).send({token: jwt.createToken(result)});
                }
                else
                    res.status(404).send({message: 'Invalid user or password'});
            })
        }
        else
            res.status(404).send({message: 'Invalid user or password'});
    })
}

module.exports = {
    getUsuarios,
    svUsuario,
    upUsuario,
    delUsuario,
    login
}