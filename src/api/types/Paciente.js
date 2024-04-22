import mongoose from "mongoose";
import { type } from "os";

const pacienteSchema = new mongoose.Schema({  
    id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    cpf:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    cns:{
        type: String,
        required: true,
    },
    Comorbidities:{
        type: String,
        required: true,
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
    updated_at:{
        type: Date,
        default: Date.now,
    },

});
export default mongoose.model("Paciente", pacienteSchema);