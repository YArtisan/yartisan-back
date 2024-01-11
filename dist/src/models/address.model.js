import mongoose from "mongoose";
let addressSchema = new mongoose.Schema({
    _id: {
        type: String,
        primary: true,
    },
    address_number: {
        type: Number,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    street_name: {
        type: String,
        required: false,
    },
    postal_code: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    lat: {
        type: String,
        required: false,
    },
    lon: {
        type: String,
        required: false,
    },
}, { timestamps: true });
export default mongoose.model("address", addressSchema);
//# sourceMappingURL=address.model.js.map