import { MongoClient } from 'mongodb';
import atlasUri from './AtlasUri.js';
import dotenv from 'dotenv';
import Logger from '../utils/logs.js';
const log = new Logger();

dotenv.config();

/**
 * Database class for managing MongoDB connections.
 */
class Database {
 client;
 databaseName = process.env.MONGODB_DATABASE_NAME;

/**
 * Creates an instance of the Database class.
 */
constructor() {
    try {
        this.client = new MongoClient(atlasUri);
        log.success('Database class instantiated');
    } catch (error) {
        log.error(`Error creating MongoClient instance: ${error}`);
        throw error;
    }
}
/**
 * Singleton instance of the Database class.
 */
static instance;

/**
 * Get the singleton instance of the Database class.
 * If the instance does not exist, it creates one.
 * @returns The singleton instance of the Database class.
 */
static getInstance() {
    if (!Database.instance) {
        log.info('Creating new Database instance');
        Database.instance = new Database();
    }
    log.info('Returning Database instance');
    return Database.instance;
}

/**
 * Connects to the MongoDB Atlas database.
 * @throws {Error} Throws an error if the connection fails.
 */
connect = async () => {
    try {
        await this.client.connect();
        log.success('Connected to MongoDB Atlas');
    } catch (error) {
        log.error(`Error connecting to MongoDB Atlas: ${error}`);
        throw error;
    }
};

/**
 * Closes the connection to the MongoDB Atlas database.
 * @throws {Error} Throws an error if the connection cannot be closed.
 */
close = async () => {
    try {
        await this.client.close();
        log.success('Closed connection to MongoDB Atlas');
    } catch (error) {
        log.error(`Error closing connection to MongoDB Atlas: ${error}`);
        throw error;
    }
};

/**
 * Get the MongoDB client instance.
 * @returns The MongoDB client instance.
 */
getClient = () => {
    log.info('Returning MongoDB client instance');
    return this.client;
};
}

export default Database;
