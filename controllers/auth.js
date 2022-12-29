const { response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarjwt } = require('../helpers/jwt');

const login = async (req, res = response) => {

    const {email, password } = req.body;

    try {

        // verificar email
        const usuarioDB = await Usuario.findOne({ email});

        if( !usuarioDB ){
            return res.status(404).json({
                ok: true,
                msg: 'Email no encontrado'
            });
        }

        //  verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if(!validPassword ){
            return res.status(400).json({
                ok: true,
                msg: 'La contraseña no válida'
            });
        }

        //  generar token
        const token = await generarjwt( usuarioDB.id);
        res.status(200).json({
            ok: true,
           token
        }) 
    } catch (error) {
       console.log(error);
       res.status(500).json({
        ok: false,
        msg: 'Error interno'
       }); 
    }
}


module.exports = {
    login
}