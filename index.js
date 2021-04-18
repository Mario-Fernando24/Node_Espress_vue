//para configurar el servidor express
//hacemos una constante y llamamos al modulo express
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';


mongoose.Promise=global.Promise;
//la cadena de conexion a la base de datos mongodb
const dbUrl='mongodb://localhost:27017/dbsistema';
mongoose.connect(dbUrl, {useUnifiedTopology:true, useNewUrlParser: true})
.then(() => console.log('DB Connected puerto 27017!'))
.catch(err => {
console.log('error mario');
});
// si todo es exitoso que nos muestre un mensaje si no que nos muestre el error

//declaramos un objeto que va hacer una instancia a express
const app=express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//ruta publica de inicio
app.use(express.static(path.join(__dirname,'public')));

//que tome el puerto asignado por el servicio SI NO que le asigne el puerto 3000
app.set('port',process.env.PORT || 3000);

app.listen(app.get('port') ,()=>{
    console.log('EL SERVIDOR'+app.get('port'));
    // console.log(path.join(__dirname,'public'));
})