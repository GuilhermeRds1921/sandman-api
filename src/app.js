import express, { json } from 'express';
import Server from './api/server.js';
import dotenv from 'dotenv';

dotenv.config();
const port = 3000;

Server.use(json());
Server.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
Server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    }
);
