import mongoose,{Shema} from 'mongoose';

//crear nuestro esquema como un esquema
const categoriaShema = new Shema({

    nombre:{type:String,maxlength:50,unique:true,required:true},
    descripcion:{type:String,maxlength:255},
    estado:{type:number,default:1},
    createdAt:{type:Date,default:Date.now}
});
 
//convertir que mogoose lo convierta a un modelo
const Categoria =mongoose.model('categoria',categoriaShema);
export default Categoria;
