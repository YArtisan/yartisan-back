import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
let favoriSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
        primary: true,
    },
    artisant_id: {
        type: String,
        require: true
    },
    day_of_week: {
        type: Number,
        require: true
    },
    opening_time: {
        type: String,
        require: true
    },
    closing_time: {
        type: String,
        require: true
    }
});
export default mongoose.model('opening_hours', favoriSchema);
//# sourceMappingURL=opening_hours.model.js.map