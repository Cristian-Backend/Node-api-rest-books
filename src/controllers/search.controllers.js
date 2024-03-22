const { response } = require("express")
const { ObjectId } = require('mongoose').Types
const User = require('../models/user')
const Categoria = require('../models/categoria')
const Book = require('../models/book')

const {buscarTodasCategorias, buscarTodosLosBooks, buscarTodosLosUsers} = require('../helpers/buscarAll')

const coleccionesPermitidas = [
    'users',
    'categorias',
    'books',
    'roles'
]


// busco el usuario por ID , lo coloco en el switch
const buscarUsuarios = async (termino = '',res= response)=> {

    if (termino === '@') {
        return buscarTodosLosUsers(res);
    }

    const esMongoID = ObjectId.isValid(termino) // true // busqueda por mongoID. 

    // si es un mongo ID 
    if(esMongoID) {
        const user = await User.findById(termino) // el termino seria el ID
      return  res.json({
            results: (user) ? [user] : [] // si el usuario existe, me devuelve el usuario en un arreglo, sino me devuelve un arreglo vacio.
        })
    } 

    const regex = new RegExp(termino,'i') // significa es insensible a las mayusculas.

    const users = await User.find({   // el regex seria el termino con mayusculas insensibles.
            // terminos de mongo
        $or : [{name: regex}, {email: regex}], // que me haga busqueda el nombre y correo con mayusculas insensibles.
        // y tambien que cumpla esta condicion.
        $and : [{estado: true}] // que el estado del usuario tiene que estara activo.
    }) 

    res.json({
        results: users
    })

}


// buscar Categorias // http://localhost:8080/api/buscar/categorias/masitas ejemplo.
const buscarCategoria = async (termino = '', res=response)=> {

    if (termino === '@') {
        return buscarTodasCategorias(res);
    }

    const esMongoID = ObjectId.isValid(termino) // true // busqueda por mongoID. 

    // si es un mongo ID 
    if(esMongoID) {
        const categorias = await Categoria.findById(termino) // el termino seria el ID
      return  res.json({
            results: (categorias) ? [categorias] : [] // si la categoria existe, me devuelve la categoria en un arreglo, sino me devuelve un arreglo vacio.
        })
    } 


    const regex = new RegExp(termino,'i') // significa es insensible a las mayusculas.

    const categoria = await Categoria.find({   // el regex seria el termino con mayusculas insensibles.
            // terminos de mongo
        $or : [{name: regex}], // que me haga busqueda el nombre con mayusculas insensibles.
        // y tambien que cumpla esta condicion.
        $and : [{estado: true}] 
    }) 

    res.json({
        results: categoria
    })

}


// buscar books


const buscarBook = async (termino = '', res=response)=> {


    if (termino === '@') {
        return buscarTodosLosBooks(res);
    }

    const esMongoID = ObjectId.isValid(termino) // true // busqueda por mongoID. 

    // si es un mongo ID 
    if(esMongoID) {
        const book = await Book.findById(termino)
                            .populate('categoria', 'name') // veo bien el nombre de las categorias , y no solo el ID
      return  res.json({
            results: (book) ? [book] : [] // si el producto existe, me devuelve  el producto en un arreglo, sino me devuelve un arreglo vacio.
        })
    } 


    const regex = new RegExp(termino,'i') // significa es insensible a las mayusculas.

    const books = await Book.find({ title: regex , estado: true   })// en una sola linea del ejemplo anterior.
                                    .populate('categoria', 'name')  // veo bien el nombre de las categorias , y no solo el ID

    res.json({
        results: books
    })

}


const buscar = (req,res = response) => {

    const {coleccion , termino} = req.params

    if (!coleccionesPermitidas.includes(coleccion)){ // si no incluye las colecciones permitidas , entonces..
        return res.status(400).json(`Las colecciones permitidas son ${coleccionesPermitidas}`)
    } 

    // en caso que toque usuarios , en caso que sea categoria , en caso que sea producto.
    switch (coleccion) {
        case 'users':
            buscarUsuarios(termino, res)
            break;

        case 'categorias':
            buscarCategoria(termino,res)
            break;
            
        case 'books':
            buscarBook(termino,res)
            break;
        
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
           
    }

}

module.exports = {
    buscar
}