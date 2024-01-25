import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const likeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      primary: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    artisant_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Like = mongoose.model('Like', likeSchema);

export default Like;
