import { query } from 'express';
import models from '../models';

//para poder exportar funciones, objetos, clases etc
export default {
    //funciones asincrona y recibe por 3 parametro
    //1: solicitud http a la funcion de middlewares
    //2: respuesta 3: devolucion de llamada
    //agregar  
    add: async (req,res, next)=>{
        
        try {

            const reg=await models.Categoria.create(req.body);
            //si todo se ejetuca correctamente
            res.status(200).json(reg);
        } catch (e) {
            //si no envio un error 500 en un array
            res.status(500).send({
               message:'ocurrio un error'
            });
            next(e);

        }
        
    },
    //consultar
    query:  async (req,res, next)=>{

        try {
          //mogoodb el id lo agrega de forma automatica a cada colección
          //buscar en la coleccion por el metodo query el id 
            const reg= await models.Categoria.findOne({_id:req.query._id});
            //consulto si no exite ese registro
            if(!reg){
                res.status(404).send({
                    message:'El registro no existe'
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
    //listaar
    list: async (req,res, next)=>{

        const reg= await models.Categoria.find({});
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
   //primer parametro la busqueda del registro que deseo actualizar
            const reg= await models.Categoria.findByIdAndUpdate({_id:req.body._id},{nombre:req.body.nombre, descripcion:req.body.descripcion})
            res.status(200).json(reg);
        } catch (e) {
            //si no envio un error 500 en un array
            res.status(500).send({
                message:'ocurrio un error'
             });
             next(e);
        }
        
    },
    remove:  async (req,res, next)=>{

        try {

            const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
            
        } catch (e) {
            //si no envio un error 500 en un array
            res.status(500).send({
                message:'ocurrio un error'
             });
             next(e);
        }
        
    },
    activate: async (req,res, next)=>{

        try {

            const reg= await models.Categoria.findByIdAndUpdate({_id:req.body._id},{estado:1});
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

            const reg= await models.Categoria.findByIdAndUpdate({_id:req.body._id},{estado:0});
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