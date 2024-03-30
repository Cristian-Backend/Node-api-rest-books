const mongoose = require('mongoose')
const {model, Schema} = require('mongoose')

const bookSchema = new mongoose.Schema({
  
    
    title: {
        type: String,
        required: [true, "el titulo es obligatorio"]
    },
    

    author: {
        type: String,
        required: [true, 'El autor es obligatorio']
    },

     categoria: {  // vamos saber la informacion de que categoria viene el producto.
        type: Schema.Types.ObjectId, 
        ref: 'Categoria', // nombro al schema Categoria
        required: true
    }  ,
    pages: {
        type: Number
    },


    publication_date: {
        type: String,
        required: [true, "La publicacion es  obligatoria"]
    },

    estado: {
        type: Boolean,
        default: true
    }

    }

)


// Quitamos lo que no queremos que se vea al crear el usuario, en este caso la contraeña y el __v
bookSchema.methods.toJSON = function(){
    const {__v , _id, estado, ...book} = this.toObject() // quitamos lo que esta seleccionado y el resto lo almacenamos en usuario.
    
    return book
}    

module.exports = mongoose.model('Book', bookSchema);