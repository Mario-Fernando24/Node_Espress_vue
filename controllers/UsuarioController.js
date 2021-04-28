import models from '../models';
import bcrypt from 'bcryptjs';
//para poder exportar funciones, objetos, clases etc
export default {
    //funciones asincrona y recibe por 3 parametro
    //1: solicitud http a la funcion de middlewares
    //2: respuesta 3: devolucion de llamada
    //agregar  
    add: async (req,res,next) =>{
        try {

            req.body.password =await bcrypt.hash(req.body.password,10);

            const reg = await models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(400).send({
                message:'Ocurrió al guardar el usuario'
            });
            next(e);
        }
    },
    //consultar
    query:  async (req,res, next)=>{

        try {
          //mogoodb el id lo agrega de forma automatica a cada colección
          //buscar en la coleccion por el metodo query el id 
            const reg= await models.Usuario.findOne({_id:req.query._id});
            //consulto si no exite ese registro
            if(!reg){
                res.status(404).send({
                    message:'El usuario se registro correctamente'
                });
            }else{
                res.status(200).json(reg);
            }
            
        } catch (e) {
            //si no envio un error 500 en un array
            res.status(500).send({
                message:'ocurrio un error'
             });
             next(e);
        }
        
    },
    //listaar todas las categorias
    list: async (req,res, next)=>{
        //el dato que se va a buscar  "RegExp" esto es como el like en mysql
        let valor=req.query.valor;
     //el metodo find espera dos parametros 1busqueda 2 propiedades filtradas
        const reg= await models.Usuario.find({ $or:[{'nombre':new RegExp(valor,'i')}, {'email':new RegExp(valor,'i')}]},{createdAt:0})
        .sort({'createdAt':-1});
        res.status(200).json(reg);

        try {
            
        } catch (e) {
            //si no envio un error 500 en un array
            res.status(500).send({
                message:'ocurrio un error'
             });
             next(e);
        }
        
    },



    update: async (req,res, next)=>{

        try {
            let pass=req.body.password;
            const reg0= await models.Usuario.findOne({_id:req.body._id})
            //si el password que me estan enviando desde el frot  es diferente al password que ya esta almacenado en el usuario lo incripto
            if(pass!=reg0.password){
            //encriptamos nuestro password antes que se actualice en nuestra base de dato
            req.body.password =await bcrypt.hash(req.body.password,10);   
            }
            //primer parametro la busqueda del registro que deseo actualizar
            const reg= await models.Usuario.findByIdAndUpdate({_id:req.body._id},{rol:req.body.rol,nombre:req.body.nombre, tipo_documento:req.body.tipo_documento, num_documento:req.body.num_documento, direccion:req.body.direccion,telefono:req.body.telefono, email:req.body.email, password:req.body.password})
            res.status(200).json(reg);
        } catch (e) {
            //si no envio un error 500 en un array
            res.status(500).send({
                message:'ocurrio un error'
             });
             next(e);
        }
        
    },

    remove: async (req,res,next) => {
        try {
            
            const reg = await models.Usuario.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    activate: async (req,res, next)=>{

        try {

            const reg= await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json(reg);
            
        } catch (e) {
            //si no envio un error 500 en un array
            res.status(500).send({
                message:'ocurrio un error'
             });
             next(e);
        }
        
    },


    desactivate: async (req,res, next)=>{

        try {

            const reg= await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg);
            
        } catch (e) {
            //si no envio un error 500 en un array
            res.status(500).send({
                message:'ocurrio un error'
             });
             next(e);
        }
        
    },
    
}