import Database from '../configs/Database.js';
import Logger from '../utils/logs.js';
import dotenv from 'dotenv';
import { MongoClient, ObjectId, Collection } from 'mongodb';

dotenv.config();
const log = new Logger();

class AgenteModel {
    client = new MongoClient(process.env.MONGODB_URL);
    collection = Collection;
    database = process.env.MONGODB_DATABASE;
    collectionName = 'Agentes';

    constructor() {
        this.client = Database.getInstance().getClient();
        log.success('Agente Class init');
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
            this.collection = this.client.db('sandman_db').collection('Agentes');
            log.success('Connected to collection: Agentes');
        }
        catch (error) {
            log.error(`Error connecting to collection: ${error}`);
            throw error;
        }
    }
    createAgente = async (agente) => {
        try {
            await this.connectToCollection();
            await this.collection.insertOne(agente);
            log.success('Agente inserted');
        }
        catch (error) {
            log.error(`Error inserting agente: ${error}`);
            throw error;
        }
    }
    readAgente = async (id) => {
        try {
            await this.connectToCollection();
            const result = await this.collection.find({ _id: new ObjectId(id) }).toArray();
            log.success('Agente found');
            return result;
        }
        catch (error) {
            log.error(`Error finding agente: ${error}`);
            throw error;
        }
    }
    updateAgente = async (id, agente) => {
        try {
            await this.connectToCollection();
            await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: agente });
            log.success('Agente updated');
        }
        catch (error) {
            log.error(`Error updating agente: ${error}`);
            throw error;
        }
    }
    deleteAgente = async (id) => {
        try {
            await this.connectToCollection();
            await this.collection.deleteOne({ _id: new ObjectId(id) });
            log.success('Agente deleted');
        }
        catch (error) {
            log.error(`Error deleting agente: ${error}`);
            throw error;
        }
    }

    searchAgente = async (search) => {
        try {
            await this.connectToCollection();
            const result = await this.collection.find({ $or: [{ name: search }, { email: search }, { phone: search }] }).toArray();
            if (result.length === 0) {
                log.error('Agente not found');
                return;
            }
            log.success('Agente found');
            return result;
        }
        catch (error) {
            log.error(`Error finding agente: ${error}`);
            throw error;
        }
    }
    deleteAll = async () => {
        try {
            await this.connectToCollection();
            await this.collection.deleteMany();
            log.success('All agentes deleted');
        }
        catch (error) {
            log.error(`Error deleting all agentes: ${error}`);
            throw error;
        }
    }
    
    verifyEmail = async (email, id) => {
        try {
            await this.connectToCollection();
            const result = await this.collection.find({ email: email }).toArray();

            console.log(result);
            const i = 0;
            if (result.length === 0) {
                return false;
            }
            
            if(result[0]._id == id){
                return false; 
            }
            
            return true;
        }
        catch (error) {
            log.error(`Error finding email: ${error}`);
            throw error;
        }
    }
}

export default AgenteModel;