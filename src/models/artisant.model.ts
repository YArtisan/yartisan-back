import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

let artisanSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      primary: true,
    },
    compagny_name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: String,
      required: true,
    },
    job_description: {
      type: String,
      required: true,
    },
    number_of_employees: {
      type: Number,
      required: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
    average_price: {
      type: Number,
      required: true,
      default:0,
    }
    
  },
  { timestamps: true }
);

export default mongoose.model("artisants", artisanSchema);
