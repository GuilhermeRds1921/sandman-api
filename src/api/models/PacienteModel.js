import Database from '../configs/Database.js';
import Logger from '../utils/logs.js';
import dotenv from 'dotenv';
import { MongoClient, ObjectId, Collection } from 'mongodb';

dotenv.config();
const log = new Logger();

class PacienteModel{
    client = new MongoClient(process.env.MONGODB_URL);
    collection = Collection;
    database = process.env.MONGODB_DATABASE;
    collectionName = 'Pacientes';

    constructor() {
        this.client = Database.getInstance().getClient();
        log.success('Paciente Class init');
    }

    connectToCollection = async () => {
        try {
            this.client = await this.client.connect();
            if (!this.collection) {
                this.collection = this.client.db(this.database).collection(this.collectionName);
                this.collection.createIndex({ email: 1 }, { unique: true });
            }
            log.info('Connected to MongoDB Atlas');

        } catch (error) {
            log.error(`Error connecting to collection: ${error}`);
            throw error;
        }
        try {
            this.collection = this.client.db('sandman_db').collection('Pacientes');
            log.success('Connected to collection: Pacientes');
        }
        catch (error) {
            log.error(`Error connecting to collection: ${error}`);
            throw error;
        }
    }
    createPaciente = async (paciente) => {
        try {
            await this.connectToCollection();
            await this.collection.insertOne(paciente);
            log.success('Paciente inserted');
        }
        catch (error) {
            log.error(`Error inserting paciente: ${error}`);
            throw error;
        }
    }
    readPaciente = async (id) => {
        try {
            await this.connectToCollection();
            const result = await this.collection.find({ _id: new ObjectId(id) }).toArray();
            log.success('Paciente found');
            return result;
        }
        catch (error) {
            log.error(`Error finding paciente: ${error}`);
            throw error;
        }
    }
    updatePaciente = async (id, agente) => {
        try {
            await this.connectToCollection();
            await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: agente });
            log.success('Paciente updated');
        }
        catch (error) {
            log.error(`Error updating paciente: ${error}`);
            throw error;
        }
    }
    deletePaciente = async (id) => {
        try {
            await this.connectToCollection();
            await this.collection.deleteOne({ _id: new ObjectId(id) });
            log.success('Paciente deleted');
        }
        catch (error) {
            log.error(`Error deleting paciente: ${error}`);
            throw error;
        }
    }
}

export default PacienteModel;