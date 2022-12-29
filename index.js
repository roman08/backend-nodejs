require('dotenv').config();

const express = require("express");
const cors = require('cors');

const { dbConnection } = require('./database/config');


// Creamos servidor express
const app = express();


//  CONFIGURAMOS CORS
app.use(cors());


//  Lectura y parseo del body
app.use(express.json());

//  BASE DE DATOS
dbConnection();


// Rutas
app.use( '/api/usuarios', require('./routes/usuario'));
app.use( '/api/login', require('./routes/auth'));


app.listen(process.env.PORT,() => {
    console.log('servidor corriendo en el puerto ' + 3000);
} );