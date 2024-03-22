const mongoose = require('mongoose');


const connectDB = async () => {
    try {

        // Conexión a la base de datos MongoDB
        await mongoose.connect(process.env.MONGODB_URL, {dbName: process.env.MONGODB_NAME , family: 4,});

        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error);
       
    }
};

module.exports = connectDB;