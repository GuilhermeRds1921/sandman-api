import express, { json } from 'express';
import { connect } from 'mongoose';
import Server from './api/server.js';

const app = express();

Server.use(json());
const port = 3000;
connect('mongodb+srv://guilhermerodrigues1921:TGDjA74OzprSDNN5@sandman.2yvfxex.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true});

Server.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

Server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);
