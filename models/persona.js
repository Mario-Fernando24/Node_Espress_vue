//en este modelo estara las personas y los proveedores
import mongoose,{Schema} from 'mongoose';
const personaSchema = new Schema({
    tipo_persona: {type: String,maxlength:200, required:true},
    nombre: {type:String,maxlength:50},
    tipo_documento: {type:String,maxlength:50},
    num_documento: {type:String,unique:true,maxlength:50},
    direccion: {type:String,maxlength:50},
    telefono: {type:String,maxlength:50},
    email: {type:String,unique:true,maxlength:50},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
});
const Persona = mongoose.model('persona',personaSchema);
export default Persona;
