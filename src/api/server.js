import express from "express";
import agenteRouter from "./routes/AgenteRouter.js";

const Server = express();
Server.use(express.json());

//Set Routers
Server.use('/agente', agenteRouter);

export default Server;