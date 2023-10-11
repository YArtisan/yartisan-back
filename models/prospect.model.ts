import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

let prospectSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    primary: true,
  },
})

export default mongoose.model('prospect', prospectSchema);