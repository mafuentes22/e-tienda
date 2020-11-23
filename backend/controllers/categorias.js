'use strict';

const Categoria = require('../models/categorias');

function getCategorias(req, res)
{
    let catId = req.params.idCat;
    if(catId)
    {
        Categoria.findByPk(catId)
        .then((result)=>{
            res.status(200).send({result});
        })
        .catch((err) => {
            res.status(500).send({message:'Error to retrieve ' + err});
        })
    }
    else
    {
        Categoria.findAll()
        .then((result)=>{
            res.status(200).send({result});
        })
        .catch((err) => {
            res.status(500).send({message:'Error to retrieve ' + err});
        })
    }
}
function svCategoria(req, res)
{
    Categoria.create({categoria: req.body.categoria})
    .then(()=>{
        res.status(200).send({message: 'Success'});
    })
    .catch((err)=>{
        res.status(500).send({message: 'Error to insert ' + err});
    });
}

function delCategoria(req,res)
{
    const catId = req.params.idCat;
    Categoria.destroy({
        where:{
            id: catId
        }
    })
    .then(()=>{
        res.status(200).send({message: 'Success'});
    })
    .catch((err)=>{
        res.status(500).send({message: 'Error to delete ' + err});
    });
}

module.exports = {
    getCategorias,
    svCategoria,
    delCategoria
}