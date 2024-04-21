import {Router} from 'express';
import AgenteController from '../controllers/AgenteController.js';

const agenteRouter = Router();
const agenteController = new AgenteController();

agenteRouter.post('/create', agenteController.createAgente);
agenteRouter.put('/update/:id', agenteController.updateAgente);
agenteRouter.delete('/delete/:id', agenteController.deleteAgente);
agenteRouter.get('/read/:id', agenteController.readAgente);


agenteRouter.get('/teste', agenteController.teste);


export default agenteRouter;