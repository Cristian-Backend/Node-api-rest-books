const express = require('express')
const { getAllBooks, getBookId, createBook, deleteBook, updateBook } = require('../controllers/books.controllers')
const {check} = require('express-validator')
const validarCampos = require('../middlewares/validar-campos')
const { existeBookPorId, existeCategoryPorId } = require('../middlewares/validacionesDB')
const { esAdminRole } = require('../middlewares/validar-roles')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = express.Router()


// obtener todos los libros
router.get('/', getAllBooks)

//obtener libro por id
router.get('/:id' , [
    check('id', 'no es un mongoid').isMongoId(),
    check('id').custom( existeBookPorId),
    validarCampos,
], getBookId)

//crear libro // ADMIN
router.post('/', [
    validarJWT,
    esAdminRole,
    check('title', "El titulo es obligatorio").not().isEmpty(),
    check('author', "El autor es obligatorio").not().isEmpty(),
    check('categoria').custom(existeCategoryPorId),
    check('categoria', "No es un mongo id valido").isMongoId(),
    check('publication_date', "fecha de publicacion obligatoria"),
    validarCampos,
],createBook)

//actualizar libro //ADMIN
router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', "no es un mongoid").isMongoId(),
    check('id').custom( existeBookPorId),
    validarCampos,
], updateBook )

//eliminar libro //ADMIN
router.delete('/:id',[
validarJWT,
esAdminRole,
check('id').custom(existeBookPorId),
validarCampos,
], deleteBook)

module.exports = router