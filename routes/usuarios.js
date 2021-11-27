const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos');
const { esRolValido, esCorreoValido, esIdValido } = require('../helpers/db-validator');

const { usuarioGet, 
        usuarioPut, 
        usuarioPost, 
        usuarioDelete, 
        usuarioPatch} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuarioGet);

router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( esIdValido ),
        check('rol').custom( esRolValido ),
        validarCampos
], usuarioPut);

router.post('/',[
        check('nombre', 'El nombre no es valido').not().isEmpty(),
        check('contraseña', 'La Contraseña debe contener un minimo de 8 caracteres').isLength({min:8}),
        check('correo','el correo no es valido').isEmail(),
        check('correo').custom( esCorreoValido ),
        //check('rol', 'no es un rol valido o permitido').isIn(['ADMIN_ROLE','USER_ROLE','VENTAS_ROLE','STAFF_ROLE']),
        check('rol').custom( esRolValido ),

        validarCampos
], usuarioPost);

router.delete('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( esIdValido ),
        validarCampos

], usuarioDelete);

router.patch('/', usuarioPatch);

module.exports = router;