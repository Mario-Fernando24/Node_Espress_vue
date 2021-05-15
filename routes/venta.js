import routerx from 'express-promise-router';
import ventaController from '../controllers/VentaController';
//importo el middlewares
import auth from '../middlewares/auth';

const router=routerx();

//solamente los administrador van a poder agregar nuevos usuarios

router.post('/add',auth.verifyVendedor,ventaController.add);
router.get('/query',auth.verifyVendedor,ventaController.query);
router.get('/list',auth.verifyVendedor,ventaController.list);
router.put('/activate',auth.verifyVendedor,ventaController.activate);
router.put('/deactivate',auth.verifyVendedor,ventaController.deactivate);
router.get('/graficaUltimos',auth.verifyUsuario,ventaController.graficaVentaUltimos12Meses);

export default router;