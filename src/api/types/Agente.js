import mongoose from "mongoose";
import { type } from "os";

const agenteSchema = new mongoose.Schema({  
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
    cdenf:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
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