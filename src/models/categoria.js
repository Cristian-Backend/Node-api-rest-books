const {model, Schema} = require('mongoose')

const CategoriaSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'] // si no coloco el nombre, se lanza ese mensaje.
    },

    estado: {
        type: Boolean,
        default: true,
        required: true
    },
 

})


// lo que no quiero que se vea ni se actualice
CategoriaSchema.methods.toJSON = function(){
    const {__v , estado,  ...data} = this.toObject()
    return data
}

    module.exports = model('Categoria', CategoriaSchema)

