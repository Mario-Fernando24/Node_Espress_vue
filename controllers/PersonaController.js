import models from '../models';
//para poder exportar funciones, objetos, clases etc
export default {
    //funciones asincrona y recibe por 3 parametro
    //1: solicitud http a la funcion de middlewares
    //2: respuesta 3: devolucion de llamada
    //agregar  
    add: async (req,res,next) =>{
        try {
            const reg = await models.Persona.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(400).send({
                message:'Ocurrió al guardar'
            });
            next(e);
        }
    },
    //consultar el modelo persona
    query:  async (req,res, next)=>{

        try {
          //mogoodb el id lo agrega de forma automatica a cada colección
          //buscar en la coleccion por el metodo query el id 
            const reg= await models.Persona.findOne({_id:req.query._id});
            //consulto si no exite ese registro
            if(!reg){
                res.status(404).send({
                    message:'Se registro correctamente'
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
        const reg= await models.Persona.find({ $or:[{'nombre':new RegExp(valor,'i')}, {'num_documento':new RegExp(valor,'i')}]},{createdAt:0})
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


    listCliente: async (req,res, next)=>{
        //el dato que se va a buscar  "RegExp" esto es como el like en mysql
        let valor=req.query.valor;
     //el metodo find espera dos parametros 1busqueda 2 propiedades filtradas y busco a todos las personas que el tipo es cliente
        const reg= await models.Persona.find({ $or:[{'nombre':new RegExp(valor,'i')}, {'num_documento':new RegExp(valor,'i')}],'tipo_documento':'Cliente'},{createdAt:0})
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

    listProveedores: async (req,res, next)=>{
        //el dato que se va a buscar  "RegExp" esto es como el like en mysql
        let valor=req.query.valor;
     //el metodo find espera dos parametros 1busqueda 2 propiedades filtradas y busco a todos las personas que el tipo es Proveedor
        const reg= await models.Persona.find({ $or:[{'nombre':new RegExp(valor,'i')}, {'num_documento':new RegExp(valor,'i')}],'tipo_documento':'Proveedor'},{createdAt:0})
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



    tipo_persona: {type: String,maxlength:200, required:true},
    nombre: {type:String,maxlength:50},
    tipo_documento: {type:String,maxlength:50},
    num_documento: {type:String,unique:true,maxlength:50},
    direccion: {type:String,maxlength:50},
    telefono: {type:String,maxlength:50},
    email: {type:String,unique:true,maxlength:50},

    update: async (req,res, next)=>{

        try {
            //primer parametro la busqueda del registro que deseo actualizar
            const reg= await models.Persona.findByIdAndUpdate({_id:req.body._id},{tipo_persona:req.body.tipo_persona,nombre:req.body.nombre, tipo_documento:req.body.tipo_documento, num_documento:req.body.num_documento, direccion:req.body.direccion,telefono:req.body.telefono, email:req.body.email})
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

    login: async (req,res, next)=>{

       try{

        let user = await models.Usuario.findOne({email:req.body.email,estado:1});

        if(user){
              //comparo la contraseña que viene del body con el de la consulta del user
            let match= await bcrypt.compare(req.body.password,user.password);
            if(match){

                let tokenReturn = await token.encode(user._id);
                res.status(200).json({user,tokenReturn});

            }else{
                res.status(404).send({
                    message:'La contraseña es incorrecta'
                });
                next(e);
            }

        }else{
            res.status(404).send({
                message:'El usuario no existe en nuestro registro'
             });
             next(e);
        }

            
        } catch (e) {
            res.status(500).send({
                message:'ocurrio algun error en el login'
             });
             next(e);
        }
    }

    
}