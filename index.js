//para configurar el servidor express

//hacemos una constante y llamamos al modulo express
const express=require('express');
const morgan=require('morgan');
const cors=require('cors');

//declaramos un objeto que va hacer una instancia a express
const app=express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//que tome el puerto asignado por el servicio SI NO que le asigne el puerto 3000
app.set('port',process.env.PORT || 3000);


app.listen(app.get('port') ,()=>{
    console.log('EL SERVIDOR'+app.get('port'));
})