const express = require('express')
const {check} = require('express-validator')
const validarCampos = require('../middlewares/validar-campos')
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categorias.controllers')
const { existeCategoryPorId } = require('../middlewares/validacionesDB')
const { esAdminRole } = require('../middlewares/validar-roles')
const { validarJWT } = require('../middlewares/validar-jwt')


const router = express.Router()


router.get('/', getCategories)

router.get('/:id', [
    check('id', 'no es un mongoid').isMongoId(),
    check('id').custom(existeCategoryPorId),
    validarCampos,
], getCategoryById)


router.post('/',[
    validarJWT,
    esAdminRole,
    check('name', "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
], createCategory)

router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', "no es un mongoID").isMongoId(),
    check('id').custom(existeCategoryPorId),
    validarCampos 
], updateCategory)

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', "No es un mongo ID").isMongoId(),
    check('id').custom(existeCategoryPorId),
    validarCampos 
],deleteCategory)


module.exports = router