'use strict';

let express = require("express");
let bodyParser = require("body-parser");
let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','PUT,DELETE,POST,OPTIONS,GET');
    res.header('Allow','PUT,DELETE,POST,OPTIONS,GET');
    next();
});

let EstadosRoute = require('./routes/estados');
let MunicipiosRoute = require('./routes/municipios');
let CategoriasRoute = require('./routes/categorias');
let DiasRoute = require('./routes/dias');
let HorarioRoute = require('./routes/horarios');
let PedidoRoute = require('./routes/pedido');

app.use('/api', EstadosRoute);
app.use('/api', MunicipiosRoute);
app.use('/api', CategoriasRoute);
app.use('/api', DiasRoute);
app.use('/api', HorarioRoute);
app.use('/api', PedidoRoute);

module.exports = app;