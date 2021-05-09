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
                message:'Ocurrió un esrror'
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
    //listaar todas las categorias
    list: async (req,res, next)=>{
        //el dato que se va a buscar  "RegExp" esto es como el like en mysql
        let valor=req.query.valor;
     //el metodo find espera dos parametros 1busqueda 2 propiedades filtradas
        const reg= await models.Ingreso.find({ $or:[{'num_comprobate':new RegExp(valor,'i')}, {'serie_comprobante':new RegExp(valor,'i')}]},{createdAt:0})
        .populate('usuario',{nombre:1})
        .populate('persona',{nombre:1})
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
    
}