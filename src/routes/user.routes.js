const express = require('express');
const {check} = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/users.controllers');
const { existeUserPorId, EmailValido, RoleValido } = require('../middlewares/validacionesDB');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();


router.get('/', getUsers)

router.get('/:id', [
    check('id', "No es un mongo id").isMongoId(),
    check('id').custom(existeUserPorId),
    validarCampos
],getUserById)

router.post('/', [
    validarJWT,
    esAdminRole,
    check('name', "El nombre es obligatorio").not().isEmpty(), // para que el campo no quede vacio
    check('email', "el correo no es valido").isEmail(),
    check('email').custom(EmailValido),
    check('password', "La contraseña debe tener al menos 6 letras").isLength({min: 6}),
    check('rol').custom( RoleValido),
    validarCampos
],createUser)

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', "No es un mongo ID").isMongoId(),
    check('id').custom(existeUserPorId),
    check('rol').custom(RoleValido),
    validarCampos
],updateUser)

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', "No es un mongo ID").isMongoId(),
    check('id').custom(existeUserPorId),
    validarCampos
], deleteUser)



module.exports = router