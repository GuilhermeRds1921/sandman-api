import express from "express";
import agenteRouter from "./routes/AgenteRouter.js";
import pacienteRouter from "./routes/PacienteRouter.js";

const Server = express();
Server.use(express.json());

//Set Routers
Server.use('/agente', agenteRouter);
Server.use('/paciente', pacienteRouter);

export default Server;