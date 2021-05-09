//en este modelo estara las personas y los proveedores
import mongoose,{Schema} from 'mongoose';
const ingresoSchema = new Schema({
    
    usuario: {type: Schema.ObjectId, ref:'usuario',required:true},
    persona: {type: Schema.ObjectId, ref:'persona',required:true},
    //modelo embebido le estoy diciendo que puedo tener 1 varios detalles que estan ingresando al almacen
    detalles: [{
        _id:{
             type:String,
             required:true
        },
        articulo:{
            type:String,
             required:true
        },
        cantidad:{
            type:Number,
             required:true
        },
        precio:{
            type:Number,
             required:true
        }
    }],
    tipo_comprobante: { type: String,maxlength:100, required:true},
    serie_comprobante: { type: String,maxlength:100, required:true},
    num_comprobate: { type: String,maxlength:100, required:true},
    impuesto:{type:Number,required:true},
    total:{type:Number,required:true},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
});
const Ingreso = mongoose.model('ingreso',ingresoSchema);
export default Ingreso;
