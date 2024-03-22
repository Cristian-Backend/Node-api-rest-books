const {Router} = require('express')
const { buscar } = require('../controllers/search.controllers')


const router = Router()


router.get('/:coleccion/:termino', buscar)



module.exports = router