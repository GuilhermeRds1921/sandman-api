import { create } from "domain";
import { response } from "express";
import Logger from '../utils/logs.js';
import { hash } from 'bcrypt';
import PacienteModel from '../models/PacienteModel.js'

const log = new Logger();

function validation(req) {
    const val = req;
    if (!val.nome || !val.email || !val.cpf || !val.telefone || !val.cns || !val.comorbidades) {
        return false;
    }
    return true;
}

class PacienteController {
    constructor(){
        this.PacienteModel = new PacienteModel();
    };

    createPaciente = async (req, res) => {
        try{
            const paciente = req.body;

            if(!paciente){
                log.error('User object is empty');
                res.status(500).send({ message: 'User object is empty'});
            }

            if(!validation){
                log.error("Invalid data");
                res.status(500).send({message: 'invalid data'});
            }

            await this.PacienteModel.createPaciente(paciente);
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

            await PacienteModel.updatePaciente(paciente);
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

            const result = await PacienteModel.readPaciente(id);
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

            await PacienteModel.deletePaciente(id);
            res.send({message: 'Paciente deleted'});

        }catch(error){
            console.log(`Error delete paciente: ${error}`);
            res.status(500).send({message: 'Error delete paciente'})
        }
    }
}

export default PacienteController;