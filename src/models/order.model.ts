import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


let ordersSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      primary: true,
    },
    user_id: {
      type: String,
      ref: "users",
      required: true,
    },
    artisan_id: {
      type: String,
      ref: "artisants",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    stripeId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["done", "shipping", "refunded", "paid", "waiting", "cancelled"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("orders", ordersSchema);
