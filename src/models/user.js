
const {model, Schema} = require('mongoose')

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'] // si no coloco el nombre, se lanza ese mensaje.
    },

    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true 
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'] 
    },

    
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'] // SOLO ESTOS 2 ROLES se podrian elegir.
    },

    estado:{ // en el estado veo si se borro de la base de datos.
        type:Boolean ,
        default: true
    },



})



userSchema.methods.toJSON = function(){
    const {__v , password, _id, estado, ...user} = this.toObject() 
    user.uid = _id // cambio en mongdb base de datos el id por el UID
   
    return user
   }


module.exports = model('User',  userSchema)