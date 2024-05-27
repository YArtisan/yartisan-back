import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

let conversationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      primary: true,
    },
    user_id: {
      type: String,
      require: true,
    },
    artisan_id: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("conversation", conversationSchema);
