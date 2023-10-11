import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

let favories = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
        primary: true,
    },
    id_post: {
        type: String,
        default: uuidv4,
        require: true
    },
    id_prospect: {
        type: String,
        default: uuidv4,
        require: true
    }
})

export default mongoose.model('favories', favories);