import models from '../models';

//para poder exportar funciones, objetos, clases etc
export default {
    //funciones asincrona y recibe por 3 parametro
    //1: solicitud http a la funcion de middlewares
    //2: respuesta 3: devolucion de llamada
    //agregar  
    add: async (req,res,next) =>{
        try {
            const reg = await models.Articulo.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(400).send({
                message:'Ocurrió un esrror'
            });
            next(e);
        }
    },
    //consultar
    query:  async (req,res, next)=>{

        try {
            const reg= await models.Articulo.findOne({_id:req.query._id})
            .populate('categoria',{nombre:1});
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
    //listaar todas las categorias
    list: async (req,res, next)=>{
        //el dato que se va a buscar  "RegExp" esto es como el like en mysql
        let valor=req.query.valor;
     //el metodo find espera dos parametros 1busqueda 2 propiedades filtradas
        const reg= await models.Articulo.find({ $or:[{'nombre':new RegExp(valor,'i')}, {'descripcion':new RegExp(valor,'i')}]},{createdAt:0})
        .populate('categoria',{nombre:1})
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
   //primer parametro la busqueda del registro que deseo actualizar
            const reg= await models.Articulo.findByIdAndUpdate({_id:req.body._id},{
                categoria:req.body.categoria,codigo:req.body.codigo,
                nombre:req.body.nombre, descripcion:req.body.descripcion,
                precio_venta:req.body.precio_venta,stock:req.body.stock})
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
            
            const reg = await models.Articulo.findByIdAndDelete({_id:req.body._id});
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

            const reg= await models.Articulo.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json(reg);
            
        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error'
             });
             next(e);
        }
        
    },


    desactivate: async (req,res, next)=>{

        try {

            const reg= await models.Articulo.findByIdAndUpdate({_id:req.body._id},{estado:0});
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