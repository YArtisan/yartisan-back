import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

let usersSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      primary: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address_id: {
      type: String,
      default: null,
      required: true,
    },
    profile_picture: {
      type: String,
      required: false,
    },
    is_artisant: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", usersSchema);
