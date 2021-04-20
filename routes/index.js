import routerx from 'express-promise-router';
import categoriaRouter from './categoria';

const router =routerx();

//cuando se haga referencia a la url 
router.use('/categoria',categoriaRouter);

export default router; 