import jwt from 'jsonwebtoken';
import models from '../models';
//decode es para decodificar y code es para codificar el token
 
//funcion para pasdo los dias los usuario dejan la app abierta le genere otro token si el token antiguo inspiro
async function checkToken(token){
    let __id=null;

    try {
        // declaro una constante entre llave porque solamente voy a obtener el id
        const {_id} = await jwt.decode(token);
        __id=_id;
    } catch (e) {
        //si ocurre algun error ese token es invalido
        return false;
    }
   //declaro una constante y ejecuto la funcio await hago referncia a su modelo usuario le mando un valor para el id y el estado del usuario sea 1 del usuario
    const user = await models.Usuario.findOne({_id:__id, estado:1});
    //si el user es valido 
    if(user){
        //genero el nuevo token espera 3 parametro el id que estamos recibiendo,
        // 2: clave secreta para generar el token
        // 3: el tiempo de duración del token
        const token = jwt.sign({_id:_id},'clavesecretaparagenerareltoken',{expiresIn: '1d'});
        //le retorno el token y el rol del usuario
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