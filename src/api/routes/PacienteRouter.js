import { Router } from "express";
import PacienteController from "../controllers/PacienteController.js";

const pacienteRouter = Router();
const pacienteController = new PacienteController();

pacienteRouter.post('/create', pacienteController.createPaciente);
pacienteRouter.put('/update', pacienteController.updatePaciente);
pacienteRouter.get('/read', pacienteController.readPaciente);
pacienteRouter.delete('/delete', pacienteController.deletePaciente);

export default  pacienteRouter;