import {Router} from 'express';
import AgenteController from '../controllers/AgenteController.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const agenteRouter = Router();
const agenteController = new AgenteController();

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    console.log(token);
    try{
        if (token) {
            const secret = process.env.JWT_SECRET;
            console.log(secret);
            jwt.verify(token, secret);
            next();
        } else {
            return res.status(401).send({
                message: 'Token não fornecido',
            });
        }
    }
    catch (error) {
        return res.status(401).send({
            message: 'Acesso negado',
        });
    }
}

agenteRouter.post('/login', agenteController.login);
agenteRouter.post('/create', checkToken, agenteController.createAgente);
agenteRouter.put('/update/:id', checkToken, agenteController.updateAgente);
agenteRouter.delete('/delete/:id',checkToken, agenteController.deleteAgente);
agenteRouter.get('/read/:id',checkToken, agenteController.readAgente);
agenteRouter.get('/search', checkToken, agenteController.searchAgente);
agenteRouter.delete('/deleteAll', checkToken,  agenteController.deleteAll);

export default agenteRouter;