import jwt from 'jsonwebtoken';
import models from '../models';

//funcion para pasdo los dias los usuario dejan la app abierta le genere otro token si el token antiguo inspiro
async function checkToken(token){
    let __id=null;

    try {
        const {_id} = await jwt.decode(token);
        __id=_id;
    } catch (e) {
        //si ocurre algun error ese token es invalido
        return false;
        
    }

    const user = await models.Usuario.findOne({_id:__id, estado:1});
    if(user){
        //genero el nuevo token
        const token = jwt.sign({_id:_id},'clavesecretaparagenerareltoken',{expiresIn: '1d'});
        return {token, rol:user.rol};
    }else{
        return false;
    }
}

export default {
    //con esta funsion creo el token
    encode: async(_id) => {
        //este metodo recibe 3 parametros el id  del usuario,  clave secreta para generar, tiempo de duración del token
        const token = jwt.sign({_id:_id},'clavesecretaparagenerareltoken',{expiresIn: '1d'});

        return token;

    },
    //esta funsion me va a servir para decodificar el token para ver si es correcto
    decode:async (token) => {
        
        try {
            //revisar la autenticidad de ese token  y solo obtener de ese token el id
             const {_id} = await jwt.verify(token,'clavesecretaparagenerareltoken');
             const userr = await models.Usuario.findOne({_id,estado:1});
             //validamos el users
             if(userr){
                 return userr;
             }else{
                 return false;
             }

        } catch (e) {
            //si hay un error es probable que ese token ya inspiro
             const  newToken= await checkToken(token);
             return newToken;
        }
    }
}