import mongoose,{Schema} from 'mongoose';

const usuarioSchema = new Schema({
    rol:{type:String, maxlength:50,required:true},
    nombre: {type:String,maxlength:50},
    tipo_documento: {type:String,maxlength:50},
    num_documento: {type:String,unique:true,maxlength:50},
    direccion: {type:String,maxlength:50},
    telefono: {type:String,maxlength:50},
    email: {type:String,unique:true,maxlength:50},
    password: {type:String,maxlength:200}, 
    estado: {type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
});

const Usuario = mongoose.model('usuario',usuarioSchema);

export default Usuario;