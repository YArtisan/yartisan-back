import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

let ordersSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    primary: true,
  },    
  user_id: {
    type: String,
    required: true
  },
  artisant_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  start_date_order: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  finish_date_order: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  isFinish: {
    type: Boolean,
    default: false,
    required: false
  }, 
  createdAt: {
    type: Date, 
    default: function() {
        const date = new Date();
        date.setUTCHours(date.getUTCHours() + 2);
        return date;
    }
  }
})

export default mongoose.model('orders', ordersSchema);
