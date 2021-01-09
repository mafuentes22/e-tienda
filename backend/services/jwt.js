'use strict';

let jwt = require('jwt-simple');
let moment = require('moment');

const { SECRET } = process.env;

let secretKey = SECRET;

function createToken(usuario){
    let payload = {
        // Datos del token
        sub:usuario.id,
        user: usuario.usuario,
        name:usuario.nombre,
        rol:usuario.idRol,
        // Fecha de creacion del token
        iat:moment().unix(),
        exp:moment().add(5,'days').unix
    };
    return jwt.encode(payload, secretKey);
}

module.exports = {
    createToken
}