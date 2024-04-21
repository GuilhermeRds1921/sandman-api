import mongoose from "mongoose";

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
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    role:{
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
export default mongoose.model("Agente", agenteSchema);