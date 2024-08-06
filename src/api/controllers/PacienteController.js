import { create } from "domain";
import { response } from "express";
import Logger from '../utils/logs.js';
import { hash } from 'bcrypt';
import PacienteModel from '../models/PacienteModel.js'

const log = new Logger();

function validation(req) {
    const val = req;
    if (!val.name || !val.email || !val.cpf || !val.phone || !val.cns ) {
        return false;
    }
    return true;
}

class PacienteController {
    pacienteModel;
    constructor(){
        this.pacienteModel = new PacienteModel();
    };

    createPaciente = async (req, res) => {
        try{
            const paciente = req.body;

            if(!validation(req.body)){
                log.error("Invalid data");
                res.status(500).send({message: 'invalid data'});
            }
            
            if(!paciente){
                log.error('User object is empty');
                res.status(500).send({ message: 'User object is empty'});
            }
            
            if (await this.pacienteModel.verifyEmail(paciente.email, paciente._id)) {
                log.error('Email already exists');
                res.status(500).send({
                    message: 'Email already exists',
                });
                return;
            }

            await this.pacienteModel.createPaciente(paciente);
            res.send({
                message: 'Paciente created',
                id: paciente._id,
            });
        
        }catch(error){
            log.error(`Error creating paciente: ${error}`);
            res.status(500).send({message: 'Error creating paciente'});
        }
        
    }

    updatePaciente = async (req, res) => {
        try{
            const id = req.params.id;
            const paciente = req.body;

            if(!id){
                res.status(500).send({message: 'Id is empty'});
                console.log("Id is empty");
            }

            if(!paciente){
                res.status(500).send({message: 'Paciente object is empty'});
                console.log("Paciente object is empty");
            }
            
            if(!validation){
                log.error("Invalid data");
                res.status(500).send({message: 'invalid data'});
            }

            if (await this.pacienteModel.verifyEmail(paciente.email, paciente._id)) {
                log.error('Email already exists');
                res.status(500).send({
                    message: 'Email already exists',
                });
                return;
            }

            await this.pacienteModel.updatePaciente(id,paciente);
            res.send({
                message: 'Paciente updated',
                id: paciente._id,
            })

        }catch(error){
            console.log(`Error updating paciente: ${error}`);
            res.status(500).send({message: 'Error updating paciente'});
        }
    }

    readPaciente = async (req, res) => {
        try{
            const id = req.params.id;

            if(!id){
                console.log("Id is empty");
                res.status(500).send({message: 'Id is empty'});
            }

            const result = await this.pacienteModel.readPaciente(id);
            res.send(result);

        }catch(error){
            console.log(`Error reading paciente: ${error}`);
            res.status(500).send({message: 'Error reading paciente'})
        }
    }

    deletePaciente = async (req, res) => {
        try{
            const id = req.params.id;

            if(!id){
                console.log("Id is empty");
                res.status(500).send({message: 'Id is empty'});
            }

            await this.pacienteModel.deletePaciente(id);
            res.send({message: 'Paciente deleted'});

        }catch(error){
            console.log(`Error delete paciente: ${error}`);
            res.status(500).send({message: 'Error delete paciente'})
        }
    }
    deleteAll = async (req, res) => {
        try {
            await this.pacienteModel.deleteAll();
            res.send({
                message: 'All pacientes deleted',
            });

        } catch (error) {
            log.error(`Error deleting all pacientes: ${error}`);
            res.status(500).send({
                message: 'Error deleting all pacientes',
            });
        }
    }
    searchPaciente = async (req, res) => {
        try {
            const search = req.body.search;
            const result = await this.pacienteModel.searchPaciente(search);
            res.send(result);

        } catch (error) {
            log.error(`Error searching paciente: ${error}`);
            res.status(500).send({
                message: 'Error searching paciente',
            });
        }
    }
}

export default PacienteController;