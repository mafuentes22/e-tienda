'use strict';

let express = require("express");
let bodyParser = require("body-parser");
const { MulterError } = require("multer");
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

global.__basedir = __dirname;

const EstadosRoute = require('./routes/estados');
const MunicipiosRoute = require('./routes/municipios');
const CategoriasRoute = require('./routes/categorias');
const DiasRoute = require('./routes/dias');
const HorarioRoute = require('./routes/horarios');
const PedidoRoute = require('./routes/pedido');
const TiendaRoute = require('./routes/tiendas');
const ProductoRoute = require('./routes/productos');
const RolRoute = require('./routes/roles');
const TipoRoute = require('./routes/tipos');
const UsuarioRoute = require('./routes/usuarios');


app.use('/api', EstadosRoute);
app.use('/api', MunicipiosRoute);
app.use('/api', CategoriasRoute);
app.use('/api', DiasRoute);
app.use('/api', HorarioRoute);
app.use('/api', PedidoRoute);
app.use('/api', TiendaRoute);
app.use('/api', ProductoRoute);
app.use('/api', RolRoute);
app.use('/api', TipoRoute);
app.use('/api', UsuarioRoute);

// Error handling
app.use(function(err, req, res, next) {
    if(err instanceof MulterError)
        res.status(400).send({message: 'Bad parameter for file upload'});
    else
        res.status(500).send({message: 'Error ' + err});
  });

module.exports = app;