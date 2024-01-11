import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
let prospectCommandSchema = new mongoose.Schema({
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
    default: function () {
        const date = new Date();
        date.setUTCHours(date.getUTCHours() + 2);
        return date;
    }
});
export default mongoose.model('prospect_command', prospectCommandSchema);
//# sourceMappingURL=prospect_command.model.js.map