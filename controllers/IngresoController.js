import models from '../models';

        async function aumentarStock(idarticulo, cantidad){
            //hago una consulta para saber el stock de ese articulo que recibo por parametro
            let {stock}= await models.Articulo.findOne({_id:idarticulo});  
            //declaro una variable nStock y le asigno el stock que me trajo de la consulta de ese articulo + la cantidad que estoy recibiendo por parametro
            let nStock=parseInt(stock)+parseInt(cantidad);
            //una ves actualizo el stock de ese articulo
            const reg = await models.Articulo.findByIdAndUpdate({_id:idarticulo},{stock:nStock});
        }

        async function disminuirStock(idarticulo, cantidad){
            //hago una consulta para saber el stock de ese articulo que recibo por parametro
            let {stock}= await models.Articulo.findOne({_id:idarticulo});  
            //declaro una variable nStock y le asigno el stock que me trajo de la consulta de ese articulo + la cantidad que estoy recibiendo por parametro
            let nStock=parseInt(stock)-parseInt(cantidad);
            //una ves actualizo el stock de ese articulo
            const reg = await models.Articulo.findByIdAndUpdate({_id:idarticulo},{stock:nStock});
        }

//para poder exportar funciones, objetos, clases etc
export default { 
   
    add: async (req,res,next) =>{
        try {
            const reg = await models.Ingreso.create(req.body);
            //llamo a la funcion
            let detalles=req.body.detalles;
            //voy a enviarle un array
            detalles.map(function(x){
               aumentarStock(x._id,x.cantidad);
            });
            res.status(200).json(reg);
        } catch (e){
            res.status(400).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    //consultar
    query:  async (req,res, next)=>{

        try {
          //mogoodb el id lo agrega de forma automatica a cada colección
          //buscar en la coleccion por el metodo query el id 
            const reg= await models.Ingreso.findOne({_id:req.query._id})
            .populate('usuario',{nombre:1})
            .populate('persona',{nombre:1});
            //consulto si no exite ese registro
            if(!reg){
                res.status(404).send({
                    message:'El ingreso no existe'
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

    // list: async (req,res,next) => {
    //     try {
    //         let valor=req.query.valor;
    //         const reg=await models.Ingreso.find({$or:[{'num_comprobante':new RegExp(valor,'i')},{'serie_comprobante':new RegExp(valor,'i')}]})
    //         .populate('usuario',{nombre:1})
    //         .populate('persona',{nombre:1})
    //         .sort({'createdAt':-1});


    //         res.status(200).json(reg);
    //     } catch(e){
    //         res.status(500).send({
    //             message:'Ocurrió un error'
    //         });
    //         next(e);
    //     }
    // },

    list: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Ingreso.find({$or:[{'num_comprobante':new RegExp(valor,'i')},{'serie_comprobante':new RegExp(valor,'i')}]},{createdAt:0})
            .populate('usuario',{nombre:1})
            .populate('persona',{nombre:1})
            .sort({'createdAt':-1});
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

            const reg= await models.Ingreso.findByIdAndUpdate({_id:req.body._id},{estado:1});
              //llamo a la funcion
              let detalles=reg.detalles;
              //voy a enviarle un array
              detalles.map(function(x){
                 aumentarStock(x._id,x.cantidad);
              });
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

            const reg= await models.Ingreso.findByIdAndUpdate({_id:req.body._id},{estado:0});
          
            //llamo a la funcion
            let detalles=reg.detalles;
            //voy a enviarle un array
            detalles.map(function(x){
                disminuirStock(x._id,x.cantidad);
            });
            
            res.status(200).json(reg);
            
        } catch (e) {
            //si no envio un error 500 en un array
            res.status(500).send({
                message:'ocurrio un error'
             });
             next(e);
        }
        
    },

    graficaIngresoUltimos12Meses: async (req,res,next)=>{
        
        try {
            const reg = await models.Ingreso.aggregate([
                //obtener el total de las ventas
                {
                    $group:{
                        //agrupo por mes y año y escojo el id
                         _id:{
                             mes:{$month:"$createdAt"},
                             year:{$year:"$createdAt"}
                         },
                         //le sumo todo el total
                         total:{$sum:"$total"},
                         //sumando de uno en uno
                         numero:{$sum:1}
                    }
                },
                //agrupar las ventas por el mes
                {
                 $sort:{
                     //voy a ordenar por el año de manera descendente
                     "_id.year":-1,"_id.mes":-1
                 }
                }
            ]).limit(12);
            
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    
    }
}