const { response } = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarjwt } = require('../helpers/jwt');

const getUsiarios = async (req, res) => {

    const usuarios =  await Usuario.find({}, 'nombre email role google');


    res.json({
        ok: true,
        usuarios
    })
}


const crearUsiarios = async(req, res = response) => {
    const { email, password } = req.body;
    


    try {

        cons = existeEmail = await Usuario.findOne({ email });

        if(existeEmail) {
            res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }
        const usuario = new Usuario(req.body);


        // ENCRIPTAR CONTRASEÑA
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);


        await usuario.save();

        const token = await generarjwt(usuario.id);
        
        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno... revisar logs'
        })
    }

}

const actualizarUsiario = async (req, res = response) => {
    const uid = req.params.id;
     
    try {
        const usuarioDb = await Usuario.findById( uid);

        if( !usuarioDb ){
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario para ese ID'
            })
        }
        const { password, google, email, ...campos} = req.body;

        if( usuarioDb.email != email) {
            const existeEmail = await Usuario.findOne({ email });
            if( existeEmail ){
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con el email ingresado'
                })
            }
        }

        campos.email = email;
        const usuarioActualizar = await Usuario.findByIdAndUpdate( uid, campos, {new: true});



        res.status(200).json({
            ok: true,
           usuario: usuarioActualizar
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno... revisar logs'
        })
    }
}

const borrarUsuario = async(req, res) => {
    const uid = req.params.id;
    try {

        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario para ese ID'
            })
        }

        await Usuario.findByIdAndDelete(uid);
        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getUsiarios,
    crearUsiarios,
    actualizarUsiario,
    borrarUsuario
}