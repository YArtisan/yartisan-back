import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

let messageSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      primary: true,
    },
    conversation_id: {
      type: String,
      require: true,
    },
    expediteur_id: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    url: {
      type: String,
    },
    createdAt: {
      type: Date,
      require: true,
      default: Date.now(),
    },
    last_update: {
      type: Date,
      require: true,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export default mongoose.model("messages", messageSchema);
