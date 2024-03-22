const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token'); // lo leemos de postman , key: x-token value: el respecito token.
	
// si no existe el token	

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY ); // quiero leer el token en postman que le mande. key: x-token  value: el respectivo token, en los headers

        // leer el usuario que corresponde al uid
        const user = await User.findById( uid );

        if( !user ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true , un usuario en  estado false no deberia logearse      
       if ( !user.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado - false'
            })
        }
        
        
        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}


module.exports ={
    validarJWT 
}