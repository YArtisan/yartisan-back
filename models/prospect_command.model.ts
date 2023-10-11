import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

let prospect_command = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
        primary: true,
    },
    status: {
        type: String,
        require: true
    },
    date_creation: {
        type: Date,
        require: true
    },
    date_exec: {
        type: Date,
        require: true
    },
    id_prospect: {
        type: uuidv4,
        require: true
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now()
    }
})

export default mongoose.model('prospect_command', prospect_command);