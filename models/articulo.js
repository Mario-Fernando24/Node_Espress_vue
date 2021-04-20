import mongoose,{Schema} from 'mongoose';

const articuloSchema = new Schema({
    //Hacemos referncia a nuestro id de categoria
    categoria:{type:Schema.ObjectId,ref:'categoria'},
    codigo: {type:String,maxlength:64},
    nombre: {type:String,maxlength:200,unique:true,required:true},
    descripcion: {type:String,maxlength:200,required:true},
    precio_venta: {type:Number,required:true},
    stock: {type:Number,required:true},
    estado: {type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
});

const Articulo = mongoose.model('articulo',articuloSchema);
//exporto el modelo
export default Articulo;