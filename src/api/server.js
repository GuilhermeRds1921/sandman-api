import express from "express";
import agenteRouter from "./routes/AgenteRouter.js";
import pacienteRouter from "./routes/PacienteRouter.js";
import cors from "cors";

//Create Server
const Server = express();
Server.use(express.json());
Server.use(cors());
//Set Routers
Server.use('/agente', agenteRouter);
Server.use('/paciente', pacienteRouter);

export default Server;