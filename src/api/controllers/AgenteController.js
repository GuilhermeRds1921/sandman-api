import AgenteModel from '../models/AgenteModel.js';
import AgenteSchema from '../types/Agente.js';
import Logger from '../utils/logs.js';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const log = new Logger();

function validation(req) {
    const val = req;
    if (!val.nome || !val.email || !val.senha || !val.telefone || !val.cdenf) {
        return false;
    }

    if (typeof val.administrador !== 'boolean') {
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

            if (!validation(req.body)) {
                log.error('Invalid data');
                console.log(req.body);
                res.status(500).send({
                    message: 'Invalid data',
                });
                return;
            };

            if (await this.agenteModel.verifyEmail(agente.email)) {
                log.error('Email already exists');
                res.status(500).send({
                    message: 'Email already exists',
                });
                return;
            }

            if (!agente) {
                log.error('User object is empty');
                res.status(500).send({
                    message: 'User object is empty',
                });
                return;
            }

            agente.senha = await hash(agente.senha, 10);
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

            if (!validation(req.body)) {
                log.error('Invalid data');
                res.status(500).send({
                    message: 'Invalid data',
                });
                return;
            };

            if (await this.agenteModel.verifyEmail(agente.email)) {
                log.error('Email already exists');
                res.status(500).send({
                    message: 'Email already exists',
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

    login = async (req, res) => {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                log.error('Insufficient data');
                res.status(500).send({
                    message: 'Insufficient data',
                });
                return;
            }

            const result = await this.agenteModel.login(email, senha);
            if (!result) {
                log.error('Erro ao realizar Login');
                res.status(500).send({
                    message: 'Erro ao realizar Login',
                });
                return;
            }
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign({ id: result._id }, secret, { expiresIn: 86400 });

            res.send({
                message: "Analista logado",
                token
        });

        } catch (error) {
            log.error(`Error logging in: ${error}`);
            res.status(500).send({
                message: 'Error logging in',
            });
        }
    }

}
export default AgenteController;