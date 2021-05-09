//hago referencia al archivo token 
import tokenService from '../services/token';

export default {
        //verificar que el usuario este autenticado de manera correcta

    verifyUsuario: async (req,res,next) => {
        //si el token esta vacio
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
         //decodifico el token (el usuario si envio el token)
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador' || response.rol == 'Vendedor' || response.rol=='Almacenero'){
            //que continue sin ningun problema
            next();
        } else{
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    
        //verificar que el usuario este autenticado de manera correcta sea el rol administrador
        verifyAdministrador: async (req,res,next) => {
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador'){
            next();
        } else{
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    
    //verificar que el usuario este autenticado de manera correcta sea el rol almacenero
    verifyAlmacenero: async (req,res,next) => {
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador' || response.rol=='Almacenero'){
            next();
        } else{
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },

    //verificar que el usuario este autenticado de manera correcta sea el rol vendedor
    verifyVendedor: async (req,res,next) => {
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador' || response.rol == 'Vendedor'){
            next();
        } else{
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    }
}