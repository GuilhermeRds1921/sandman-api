import { Router } from "express";
import PacienteController from "../controllers/PacienteController.js";

const pacienteRouter = Router();
const pacienteController = new PacienteController();

pacienteRouter.post('/create', pacienteController.createPaciente);
pacienteRouter.put('/update/:id', pacienteController.updatePaciente);
pacienteRouter.get('/read/:id', pacienteController.readPaciente);
pacienteRouter.delete('/delete/:id', pacienteController.deletePaciente);
pacienteRouter.delete('/deleteAll', pacienteController.deleteAll);
pacienteRouter.get('/search', pacienteController.searchPaciente);

export default  pacienteRouter;