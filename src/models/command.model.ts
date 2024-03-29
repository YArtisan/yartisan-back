import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

let commandSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
        primary: true,
    },
    title: {
        type: String,
        require: true
    },
    date_creation:{
        type: Date,
        require: true
    },
    date_start_post: {
        type: Date,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    id_artisant:{
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now()
    }
})

export default mongoose.model('command', commandSchema);