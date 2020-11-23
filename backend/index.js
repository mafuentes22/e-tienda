'use strict';

require('mandatoryenv').load([
  'DB_HOST',
  'DB_DATABASE',
  'DB_USER',
  'DB_PASSWORD',
  'PORT',
  'SECRET'
]);

let sequelize = require('./database/database');

let app = require("./app");
const { PORT } = process.env;

sequelize
  .authenticate()
  .then(() => {
    //console.log('Connection has been established successfully.');
    console.log("Base de datos en linea");
    app.listen(PORT,(err)=>{
        console.log(err?"Error en el servidor":"Servidor Web en linea");                
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });