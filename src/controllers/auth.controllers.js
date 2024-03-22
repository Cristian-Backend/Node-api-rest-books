const {response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { generarJWT } = require('../helpers/generar-JWT')

const login = async(req,res = response) => {


    const {email,password} = req.body

    try {

        // traemos al correo de la base de datos.
        const user = await User.findOne({email}) // traemos al correo.
        
        if(!user){ // si no existe el correo en la base de datos.
            res.status(400).json({
                msg: 'el usuario/  y/o password son incorrectos'
            })
        }

        // verificamos el estado del usuario

        if(!user.estado) { // si el estado de el usuario es falso
            res.status(400).json({
                msg: 'El usuario y / o password son incorrectos. - estado - false'
            })
        }


        // verificiar contraseña  con la de la base de datos  // comparamos contraseña
        const passwordValido = bcryptjs.compareSync(password, user.password) //Validamos la contraseña que ingresamos con la contraseña de la base de datos.
            if(!passwordValido) {
            res.status(400).json({
                msg: 'el usuario / Password no son correctos - password'
            })
        }


        //Generar token / podemos generar el token aca pero los ponemos en helpers para que el codigo este mas limpio con un new promise
        const token = await generarJWT(user.id)

        res.json({
            user,
            token
        })

        
    } catch (error) {
        
        console.log(error)
        return res.status(500).json({
             msg: 'Hable con el administrador'
         })

    }


}

module.exports = {
    login
}