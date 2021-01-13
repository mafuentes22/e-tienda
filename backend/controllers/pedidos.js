'use strict';

const PedidoH = require('../models/pedidosH');
const PedidoD = require('../models/pedidosD');
const Tienda = require('../models/tiendas');
const Usuario = require('../models/usuarios');
const Producto = require('../models/productos');
const { Op } = require('sequelize');
const moment = require('moment');

function getPedidos(req,res)
{
    let id = req.params.id;
    if(id)
    {
        PedidoH.findByPk(id)
        .then(result => {
            res.status(200).send({result});
        })
        .catch(err => {
            res.status(500).send({message: 'Error to retrieve ' + err});
        });
    }
    else
    {
        PedidoH.findAll()
        .then(result => {
            res.status(200).send({result});
        })
        .catch(err => {
            res.status(500).send({message: 'Error to retrieve ' + err});
        })
    }
}

function getPedidosDet(req,res)
{
    let id = req.params.id;
    if(id)
    {
        PedidoD.findAll({
            where: {
                idPedido: id
            }
        })
        .then(result => {
            res.status(200).send({result});
        })
        .catch(err => {
            res.status(500).send({message: 'Error to retrieve ' + err});
        });
    }
    else
        res.status(404).send({message: 'No ID'});
}

// Guardar pedido
function svPedido(req,res)
{
    // Para insertar el pedido se debe insertar el cabecero leyendo el body
    // Para insertar el detalle se lee el arreglo de objetos "detalle"
    // se debe consultar el precio de los articulos para poder insertarlos
    const idT = req.body.idTienda;
    const idU = req.body.idUsuario;
    const fActual = moment().add(moment().utcOffset() / 60, 'hours');
    const detalle = req.body.detalle;

    Tienda.findByPk(idT)
    .then((tienda) => {
        if(tienda)
        {
            Usuario.findByPk(idU)
            .then((us) => {
                if(us)
                {
                    // let promProductos = new Promise((resolve, reject) => {
                        const idsP = detalle.map(elem => elem.idProducto);
                        Producto.findAll({
                            where: {
                                id: { [Op.in]: idsP }
                            }
                        })
                        .then(prods => {
                            let todosProd = true;
                            for(let i = 0; i < detalle.length; i++)
                            {
                                let prodAct = prods.find(p => p.id === detalle[i].idProducto);
                                if(prodAct)
                                {
                                    detalle[i].precioU = prodAct.precio;
                                    detalle[i].total = prodAct.precio * detalle[i].cantidad;
                                }
                                else
                                    todosProd = false;
                            }
                            if(todosProd)
                            {
                                PedidoH.create({
                                    idTienda: idT,
                                    idUsuario: idU,
                                    fecha: fActual,
                                    Detalle: detalle
                                },{
                                    include: [{
                                        model: PedidoD,
                                        as: 'Detalle'
                                    }]
                                })
                                .then(result => {
                                    res.status(201).send({message: 'Success'});
                                })
                                .catch(err => {
                                    res.status(500).send({message: 'Failed to insert ' + err});
                                });
                            }
                            else
                                res.status(404).send({message: 'Product not found'});
                        })
                        .catch(err => {
                            res.status(500).send({message: 'Error ' + err});
                        })
                }
                else
                    res.status(400).send({message: 'User not found'});
            })
        }
        else
            res.status(400).send({message: 'Store not found'});
    })
    .catch(err => {
        res.status(500).send({message: 'Error ' + err});
    })
}

module.exports = {
    getPedidos,
    getPedidosDet,
    svPedido
}