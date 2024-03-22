const Categoria = require('../models/categoria')
const Book = require('../models/book')
const User = require('../models/user')
const buscarTodasCategorias = async (res=response) => {
    const categorias = await Categoria.find();
    return res.json({
        results: categorias
    });
}


const buscarTodosLosBooks = async (res=response) => {
    const books = await Book.find();
    return res.json({
        results: books
    });
}


const buscarTodosLosUsers = async (res=response) => {
    const users = await User.find();
    return res.json({
        results: users
    });
}

module.exports = {
    buscarTodasCategorias,
    buscarTodosLosBooks,
    buscarTodosLosUsers
}