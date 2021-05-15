import routerx from 'express-promise-router';
import ingresoController from '../controllers/IngresoController';
//importo el middlewares
import auth from '../middlewares/auth';

const router=routerx();

//solamente los administrador van a poder agregar nuevos usuarios

router.post('/add',auth.verifyAlmacenero,ingresoController.add);
router.get('/query',auth.verifyAlmacenero,ingresoController.query);
router.get('/list',auth.verifyAlmacenero,ingresoController.list);
router.put('/activate',auth.verifyAlmacenero,ingresoController.activate);
router.put('/deactivate',auth.verifyAlmacenero,ingresoController.desactivate);
router.get('/graficaUltimosIngreso',auth.verifyUsuario,ingresoController.graficaIngresoUltimos12Meses);

export default router;