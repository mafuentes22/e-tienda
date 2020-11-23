'use strict';

const PedidoH = require('../models/pedidosH');
const PedidoD = require('../models/pedidosD');
const Tienda = require('../models/tiendas');
const Usuario = require('../models/usuarios');
const Producto = require('../models/productos');

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
    const fec = req.body.fecha;
    const detalle = req.body.detalle;

    Tienda.findByPk(idT)
    .then((tienda) => {
        if(tienda)
        {
            Usuario.findByPk(idU)
            .then((us) => {
                if(us)
                {
                    PedidoH.create({
                        idTienda: idT,
                        idUsuario: idU,
                        fecha: fec
                    })
                    .then((h) => {
                        let success = true;
                        detalle.map(async (elem, index) => {
                            // Consultar cada producto para insertar su precio actual
                            let prod = await Producto.findByPk(elem.idProducto);
                            // Insertar tambien el nombre del producto
                            // crear el campo de nombre del producto en la tabla pedidoD
                            await PedidoD.create({
                                idPedido: 0,
                                idProducto: prod.id,
                                precioU: prod.precio,
                                cantidad: elem.cantidad,
                                total: prod.precio * elem.cantidad
                            });
                            // Validar que se haya insertado correctamente
                        })
                    })
                    .catch(err => {
                            res.status(500).send({message: 'Error to insert' + err});
                        });
                }
                else
                    res.status(400).send({message: 'User not found'});        
            })
        }
        else
            res.status(400).send({message: 'Store not found'});
    })
    .catch(err => {
        res.status(500).send({message: 'Error to insert' + err});
    })

    console.log(JSON.stringify(req.body));
    res.status(200).send({message: 'Success'});
}

module.exports = {
    getPedidos,
    getPedidosDet,
    svPedido
}