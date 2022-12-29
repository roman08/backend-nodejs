/*
    Ruta: /api/usuarios
*/

const { Router } = require("express");
const { body } = require("express-validator");
const { validarCampos  } = require('../middlewares/validar-campos');

const { getUsiarios, crearUsiarios, actualizarUsiario, borrarUsuario } =  require('../controllers/usuarios');
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();


router.get('/',  validarJWT, getUsiarios);

router.post('/',
    [
        body('nombre', 'El nombre es obligatorio').not().isEmpty(),
        body('password', 'El password es obligatorio').not().isEmpty(),
        body('email', 'El email es obligatorio').isEmail(),
        validarCampos

    ] ,crearUsiarios);

router.put('/:id',
    [
        validarJWT,
        body('nombre', 'El nombre es obligatorio').not().isEmpty(),
        body('email', 'El email es obligatorio').isEmail(),
        body('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
        
    ], actualizarUsiario);

router.delete('/:id', validarJWT, borrarUsuario);

module.exports = router;