import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

let favoriSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
        primary: true,
    },
    id_post: {
        type: String,
        require: true
    },
    id_prospect: {
        type: String,
        required: true
    }
})

export default mongoose.model('favories', favoriSchema);