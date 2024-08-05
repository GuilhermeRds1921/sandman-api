import mongoose from "mongoose";

const agenteSchema = new mongoose.Schema({  
    id: mongoose.Schema.Types.ObjectId,
    nome:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    cdenf:{
        type: String,
        required: true,
    },
    senha:{
        type: String,
        required: true,
    },
    telefone:{
        type: String,
        required: true,
    },
    administrador:{
        type: Boolean,
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
export default mongoose.model("Agente", agenteSchema);