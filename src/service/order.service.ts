import ordersSchema from "../models/order.model.js";
import usersSchema from "../models/users.model.js";
import express, { Request, Response } from "express";
import { orderDto } from "../dto/order.dto.js";

async function createOrder(data: orderDto) {
  return new Promise((resolve, reject) => {
    const newOrder = new ordersSchema(data);
    newOrder.save().then(resolve).catch(reject);
  });
}

async function getAllOrderByUser(user_id: string) {
  return new Promise((resolve, reject) => {
    ordersSchema
      .find({
        user_id,
      })
      .then(resolve)
      .catch(reject);
  });
}

async function getAllOrderByArtisan(artisan_id: string) {
  return new Promise((resolve, reject) => {
    ordersSchema
      .find({
        artisan_id,
      })
      .then(resolve)
      .catch(reject);
  });
}

async function updateOrder(
  _id: string,
  data: Partial<orderDto>
): Promise<void> {
  return new Promise<any>((resolve, reject) => {
    console.log("update", _id, data);
    
    ordersSchema.updateOne({ _id }, data).then(resolve).catch(reject);
  });
}

async function updateOrderByStripeId(
  stripeId: string,
  data: Partial<orderDto>
): Promise<void> {
  return new Promise<any>((resolve, reject) => {
    ordersSchema.updateOne({ stripeId }, data).then(resolve).catch(reject);
  });
}

export default {
  createOrder,
  getAllOrderByUser,
  getAllOrderByArtisan,
  updateOrder,
  updateOrderByStripeId
};
