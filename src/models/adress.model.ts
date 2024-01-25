import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

let adressSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    primary: true,
  },
  adress_number: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street_name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  average_price: {
    type: Number,
    required: true,
    default:0,
  }
})

export default mongoose.model('adress', adressSchema);