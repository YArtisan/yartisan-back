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
  },
  { timestamps: true }
);

export default mongoose.model("messages", messageSchema);
