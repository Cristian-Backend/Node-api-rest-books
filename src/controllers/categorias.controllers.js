const Categoria = require('../models/categoria')


//obtener categoria
const getCategories = async(req,res)=> {

    const categoria = await Categoria.find()

    res.json(categoria)
}


// obtener categoria por ID
const getCategoryById = async(req,res)=> {

    const {id} = req.params
    const categoria = await Categoria.findById(id)

    res.json(categoria)
}


const createCategory = async (req, res) => {
    const { name } = req.body; // Desestructuración para obtener el nombre desde el cuerpo de la solicitud

    // Verificar si la categoría ya existe en la base de datos
    const categoriaDB = await Categoria.findOne({ name });

    if (categoriaDB) { // Si la categoría ya existe, responder con un error
        return res.status(400).json({
            msg: `La categoría ${name} ya existe en la base de datos.`,
            categoria: categoriaDB // Proporcionar información adicional sobre la categoría existente
        });
    }

    // Crear la nueva categoría
    const nuevaCategoria = new Categoria({ name });

    // Guardar la nueva categoría en la base de datos
    await nuevaCategoria.save();

    // Responder con éxito y la categoría creada
    res.status(201).json({
        msg: "Categoría creada exitosamente",
        categoria: nuevaCategoria
    });
}

// actualizar categoria
const updateCategory = async(req,res)=> {

    const {id} = req.params

    const {estado , ...data } = req.body // evitamos actualizar el estado.

    const categoria = await Categoria.findByIdAndUpdate(id, data,  {new: true})

    res.json(categoria)

}

//Eliminar categoria
const deleteCategory = async(req,res)=>{

    const {id} = req.params

    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false})

    res.json({
        msg: "Categoria eliminada correctamente",
        categoria
    })

}

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}