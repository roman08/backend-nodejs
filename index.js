require('dotenv').config();

const express = require("express");
const cors = require('cors');

const { dbConnection } = require('./database/config');


// Creamos servidor express
const app = express();


//  CONFIGURAMOS CORS
app.use(cors());


//  BASE DE DATOS
dbConnection();


// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
});

app.listen(process.env.PORT,() => {
    console.log('servidor corriendo en el puerto ' + 3000);
} );