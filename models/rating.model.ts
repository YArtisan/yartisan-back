import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

let ratingSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    primary: true,
  },
  user_id: {
    type: String,
    primary: true,
  },
  artisant_id: {
    type: String,
    required: true
  },
  score: {
    type: String,
    required: true
  },
  avis: {
    type: String,
    required: true
  },
}, {timestamps: true});

export default mongoose.model('rating', ratingSchema);
