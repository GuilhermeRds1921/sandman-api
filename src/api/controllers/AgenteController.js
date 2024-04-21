import AgenteModel from '../models/AgenteModel.js';
import AgenteSchema from '../types/Agente.js';
import Logger from '../utils/logs.js';
import { hash } from 'bcrypt';

const log = new Logger();

function validation(req) {
    const val = req;
    if (!val.name || !val.email || !val.password || !val.phone || !val.role) {
        return false;
    }
    return true;
}
class AgenteController {
    agenteModel;
    constructor() {
        this.agenteModel = new AgenteModel();
    }
    createAgente = async (req, res) => {

        try {
            const agente = new AgenteSchema(req.body);
            if (!agente) {
                log.error('User object is empty');
                res.status(500).send({
                    message: 'User object is empty',
                });
                return;
            }

            if (!validation(agente)) {
                log.error('Invalid data');
                res.status(500).send({
                    message: 'Invalid data',
                });
                return;
            };
            if (await this.agenteModel.searchAgente(agente.email)) {
                log.error('Email already exists');
                res.status(500).send({
                    message: 'Email already exists',
                });
                return;
            }
            agente.password = await hash(agente.password, 10);
            await this.agenteModel.createAgente(agente);
            res.send({
                message: 'Agente created',
                id: agente._id,
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

        } catch (error) {
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

    searchAgente = async (req, res) => {
        try {
            const search = req.body.search;
            const result = await this.agenteModel.searchAgente(search);
            res.send(result);

        } catch (error) {
            log.error(`Error searching agente: ${error}`);
            res.status(500).send({
                message: 'Error searching agente',
            });
        }
    }
    deleteAll = async (req, res) => {
        try {
            await this.agenteModel.deleteAll();
            res.send({
                message: 'All agentes deleted',
            });

        } catch (error) {
            log.error(`Error deleting all agentes: ${error}`);
            res.status(500).send({
                message: 'Error deleting all agentes',
            });
        }
    }
}
export default AgenteController;