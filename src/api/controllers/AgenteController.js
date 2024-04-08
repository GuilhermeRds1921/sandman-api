import Agente from '../models/AgenteModel.js';
import Logger from '../utils/logs.js';
const log = new Logger();


class AgenteController {
    agenteModel;
    constructor() {
        this.agenteModel = new Agente();
    }
    createAgente = async (req, res) => {

        try {
            const agente = req.body;

            if (!agente) {
                log.error('User object is empty');
                res.status(500).send({
                    message: 'User object is empty',
                });
                return;
            }

            await this.agenteModel.createAgente(agente);
            res.send({
                message: 'Agente created',
            });

        } catch (error) {
            log.error(`Error creating agente: ${error}`);
            res.status(500).send({
                message: 'Error creating agente',
            });
        }
    }
    readAgente = async (req, res) => {
        try {
            const id = req.params.id;

            if (!id) {
                log.error('Id is empty');
                res.status(500).send({
                    message: 'Id is empty',
                });
                return;
            }

            const result = await this.agenteModel.readAgente(id);
            res.send(result);

        }catch (error) {
            log.error(`Error reading agente: ${error}`);
            res.status(500).send({
                message: 'Error reading agente',
            });
        }
    }
    updateAgente = async (req, res) => {
        try {
            const id = req.params.id;
            const agente = req.body;

            if (!id) {
                log.error('Id is empty');
                res.status(500).send({
                    message: 'Id is empty',
                });
                return;
            }

            if (!agente) {
                log.error('Agente object is empty');
                res.status(500).send({
                    message: 'Agente object is empty',
                });
                return;
            }

            await this.agenteModel.updateAgente(id, agente);
            res.send({
                message: 'Agente updated',
            });

        } catch (error) {
            log.error(`Error updating agente: ${error}`);
            res.status(500).send({
                message: 'Error updating agente',
            });
        }
    }
    deleteAgente = async (req, res) => {
        try {
            const id = req.params.id;

            if (!id) {
                log.error('Id is empty');
                res.status(500).send({
                    message: 'Id is empty',
                });
                return;
            }

            await this.agenteModel.deleteAgente(id);
            res.send({
                message: 'Agente deleted',
            });

        } catch (error) {
            log.error(`Error deleting agente: ${error}`);
            res.status(500).send({
                message: 'Error deleting agente',
            });
        }
    }

    teste(req, res) {
        try {
            log.info('Teste');
            res.send('Teste');
            
        } catch (error) {
            log.error(`Error creating teste: ${error}`);
            res.status(500).send({
                message: 'Error creating teste',
            });
        }
    }
}
export default AgenteController;