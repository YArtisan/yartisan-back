import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

let likeSchema = new mongoose.Schema(
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
      type: Number,
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
    postId: {
       type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
   },
  },
  { timestamps: true }
);

export default mongoose.model("like", likeSchema);
