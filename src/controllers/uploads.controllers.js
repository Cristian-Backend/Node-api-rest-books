const { response } = require('express');
const path = require('path');

const cargarArchivo = (req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ message: 'No hay archivos que subir' });
    }

    const { archivo } = req.files;
    // Asegúrate de usar la ruta correcta para 'uploads' dentro de 'src'
    const uploadPath = path.join(__dirname, '../uploads', archivo.name);

    // Usa el método mv() para colocar el archivo en el servidor
    archivo.mv(uploadPath, (err) => {
        if (err) {
            console.error('Error al subir el archivo:', err);
            return res.status(500).json({ err });
        }

        res.json({ msg: 'Archivo subido a', uploadPath });
    });
};

module.exports = {
    cargarArchivo
};
