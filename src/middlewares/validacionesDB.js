const Book = require('../models/book')
const Categoria = require('../models/categoria')
const User = require('../models/user')
const Role = require('../models/role')



const existeBookPorId = async(id)=> {
    const BookExiste = await Book.findById(id)

    if (!BookExiste) {
        throw new Error (`el id ${id} no existe`)
    }
}



const existeCategoryPorId = async(id)=> {
    const CategoryExiste = await Categoria.findById(id)

    if (!CategoryExiste) {
        throw new Error (`el id ${id} no existe`)
    }
}


const existeUserPorId = async(id)=>{
    const usuarioExiste = await User.findById(id)

    if(!usuarioExiste){
        throw new Error (`el id ${id} no existe`)
    }
}

const EmailValido = async(email = '') =>{

const existeEmail = await User.findOne({email})

// si existe email 
if(existeEmail){
    throw new Error (`el ${email} ya existe en la base de datos`)
}

}

// existe rol
// role si existe en base de datos.
const RoleValido = async (rol = '') => {
    const RolExiste = await Role.findOne({ rol })
    if (!RolExiste) { 
        throw new Error(`Este rol no existe en la Base de datos`)
    }
}


const existeCategoriaPorId = async(id) => {
    const categoriaExiste = await Categoria.findById(id)

    if (!categoriaExiste){
        throw new Error (`el id  ${id} no existe ` )
         }


}

module.exports = {
    existeBookPorId,
    existeCategoryPorId,
    existeUserPorId,
    EmailValido,
    RoleValido,
}