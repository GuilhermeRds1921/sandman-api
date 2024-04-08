import Database from '../configs/Database.js';
import Logger from '../utils/logs.js';
import { MongoClient, ObjectId } from 'mongodb';

const log = new Logger();

class AgenteModel {
     client = new MongoClient('mongodb+srv://guilhermerodrigues1921:TGDjA74OzprSDNN5@sandman.2yvfxex.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true});
     collection;
     database;
     collectionName;
   
    constructor() {
        this.client = new Database().getClient();
        log.success('Agente Class init');
    }

    connectToCollection = async () => {
        try{
            this.client = await this.client.connect();
           log.info('Connected to MongoDB Atlas');

            if(!this.collection){
                this.collection = this.client.db(this.database).collection('Agentes');
            this.collection.createIndex({cpf: 1}, {unique: true});
            log.info('Connected to collection');
            }
        } catch (error) {
            log.error(`Error connecting to collection: ${error}`);
            throw error;
        }
        try{
            this.collection = this.client.db('sandman_db').collection('agentes');
            log.success('Connected to collection');
        }
        catch(error){
            log.error(`Error connecting to collection: ${error}`);
            throw error;
        }
    }
    createAgente = async (agente) => {
        try{
            await this.connectToCollection();
            await this.collection.insertOne(agente);
            log.success('Agente inserted');
        }
        catch(error){
            log.error(`Error inserting agente: ${error}`);
            throw error;
        }
    }
    readAgente = async (id) => {
        try{
            await this.connectToCollection();
            const result = await this.collection.find({ _id: new ObjectId(id) }).toArray();
            log.success('Agente found');
            return result;
        }
        catch(error){
            log.error(`Error finding agente: ${error}`);
            throw error;
        }
    }
    updateAgente = async (id, agente) => {
        try{
            await this.connectToCollection();
            await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: agente });
            log.success('Agente updated');
        }
        catch(error){
            log.error(`Error updating agente: ${error}`);
            throw error;
        }
    }
    deleteAgente = async (id) => {
        try{
            await this.connectToCollection();
            await this.collection.deleteOne({ _id: new ObjectId(id) });
            log.success('Agente deleted');
        }
        catch(error){
            log.error(`Error deleting agente: ${error}`);
            throw error;
        }
    }
}

export default AgenteModel;