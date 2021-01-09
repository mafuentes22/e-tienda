'use strict';

const fs = require('fs');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const Producto = require('../models/productos');


function getProductos(req,res)
{
    // Buscar productos por tienda
    let idT = req.params.id;
    Producto.findAll({
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

function getProducto(req,res)
{
    // Buscar producto especifico
    let idProd = req.params.id;
    const filtro = req.query.search;
    if(filtro)
    {
        Producto.findAll({
            where:{
                nombre: {
                    [Op.like]: '%'+filtro+'%'
                }
            }
        })
        .then((result)=>{
            res.status(200).send({result});
        })
        .catch((err) => {
            res.status(500).send({message:'Error to retrieve ' + err});
        })
    }
    else
    {
        Producto.findByPk(idProd)
        .then((result)=>{
            res.status(200).send({result});
        })
        .catch((err) => {
            res.status(500).send({message:'Error to retrieve ' + err});
        })
    }
}

function svProducto(req,res)
{   
    if(req.validationError)
        res.status(500).send({message: 'Only images allowed'});
    else
    {    
        console.log(req.file);
        const prod = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            imagen: req.file.filename,
            idTienda: req.body.idTienda,
            idCategoria: req.body.idCategoria
        }

        Producto.create(prod)
        .then(()=>{
            res.status(200).send({message: 'Success'});
        })
        .catch(err => {
            // Eliminar imagen si no se pudo guardar el producto
            fs.unlinkSync(req.file.path);
            res.status(500).send({message:'Failed to save ' + err});
        });
    }
}

function upProducto(req,res)
{
    if(req.validationError)
        res.status(500).send({message: 'Only images allowed'});
    else
    {    
        const idProd = req.params.id;
        const prod = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            imagen: req.file.filename,
            idCategoria: req.body.idCategoria
        }
        let imagenAnt;
        Producto.findByPk(idProd)
        .then(result => {
            imagenAnt = result.imagen;
            result.update(prod)
            .then(() => {
                // Eliminar imagen anterior
                fs.unlinkSync(__basedir + '/public/uploads/' + imagenAnt);
                res.status(200).send({message: 'Success'});
            })
            .catch(err => {
                fs.unlinkSync(req.file.path);
                res.status(500).send({message: 'Failed to update ' + err});
            })
        })
        .catch(err => {
            // Eliminar imagen si no se pudo actualizar el producto
            fs.unlinkSync(req.file.path);
            res.status(404).send({message: 'Failed to get ' + err});
        });
    }
}

function delProducto(req,res)
{
    let idP = req.params.id;
    let img;
    Producto.findByPk(idP)
    .then(prod => {
        img = prod.imagen;
        prod.destroy()
        .then(() => {
            fs.unlinkSync(__basedir + '/public/uploads/' + img);
            res.status(200).send({message: 'Success'});
        })
        .catch((err) => {
            res.status(500).send({message:'Failed to delete ' + err});
        });
    })
    .catch((err) => {
        res.status(404).send({message:'Product not found ' + err});
    });
}

module.exports = {
    getProductos,
    getProducto,
    svProducto,
    upProducto,
    delProducto
}