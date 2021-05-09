import routerx from 'express-promise-router';
import proveedorController from '../controllers/PersonaController';
//importo el middlewares
import auth from '../middlewares/auth';

const router=routerx();

//solamente los administrador van a poder agregar nuevos usuarios

router.post('/add',auth.verifyUsuario,proveedorController.add);
router.get('/query',auth.verifyUsuario,proveedorController.query);
router.get('/list',auth.verifyUsuario,proveedorController.list);
router.get('/listCliente',auth.verifyUsuario,proveedorController.listCliente);
router.get('/listProveedor',auth.verifyUsuario,proveedorController.listProveedores);
router.put('/update',auth.verifyUsuario,proveedorController.update);
router.delete('/remove',auth.verifyUsuario,proveedorController.remove);
router.put('/activate',auth.verifyUsuario,proveedorController.activate);
router.put('/deactivate',auth.verifyUsuario,proveedorController.desactivate);

export default router;