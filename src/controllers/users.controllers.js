const User = require ('../models/user')
const bcryptjs = require('bcryptjs')

// obtener todos los usuarios
const getUsers = async (req,res) => {

const user = await User.find()

res.json(user)

}

// obtener usuario por ID
const getUserById = async(req,res) => {

    const {id} = req.params
    
    const user = await User.findById(id)

    res.json( user)

}

//crear usuario
const createUser = async(req,res) => {

  // mandamos lo que queremos
const {name , email, password , rol} = req.body

const user = new User({name, email,password,rol})

// encriptar contraseña
const salt = bcryptjs.genSaltSync(); // numero de vueltas por defecto es 10
 user.password = bcryptjs.hashSync( password, salt );


await user.save(

    res.status(201).json({
        msg: "Usuario creado",
        user
    })
)


}


const updateUser = async(req,res) =>{

    const {id} = req.params

    const {password, estado, ...resto} = req.body // no quiero que se acutalice la password, el resto es todo lo demas que si se va a actualizar.

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate(id,resto , {new: true})

    res.json({
        msg: "Usuario actualizado",
        user
    })


}


const deleteUser = async(req,res) => {
    const {id} = req.params

    const user = await User.findByIdAndUpdate(id, {estado:false})

    res.json({
        msg: "usuario borrado correctamente",
        user
    })
}





module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}