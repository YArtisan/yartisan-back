import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
let usersSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
        primary: true,
    },
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    is_artisant: {
        type: Boolean,
        required: true,
    },
    avatar: {
        type: String,
        required: false
    },
    id_artisant: {
        type: String,
        required: false
    },
    id_prospect: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: function () {
            const date = new Date();
            date.setUTCHours(date.getUTCHours() + 2);
            return date;
        }
    }
});
export default mongoose.model('users', usersSchema);
//# sourceMappingURL=users.model.js.map