import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

let artisanSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    primary: true,
  },
  compagny_name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  job_description: {
    type: String,
    required: true
  },
  salarial_number: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true,
  },
  notes: {
    type: Number,
    required: false
  },
})

export default mongoose.model('artisants', artisanSchema);