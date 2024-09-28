const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')
const cors = require('cors')
require('dotenv').config()


const bookRoutes = require('./routes/books.routes')
const categoryRoutes = require('./routes/categorias.routes')
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
const searchRouter = require('./routes/search.routes')
const uploadRoutes = require('./routes/uploads.routes')
// conexion bd
const connectDB = require('./database/db')

const app = express()

//middlewares 

app.use(cors())
app.use(express.json())

// fileUpload - carga de archivos
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//rutas
app.use('/books', bookRoutes)
app.use('/categorias', categoryRoutes)
app.use('/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/buscar', searchRouter)
app.use('/api/uploads', uploadRoutes)

const port = process.env.PORT || 3000

app.listen(port,()=> {
    connectDB()
    console.log(`Escuchando en el puerto ${port}`)
})
