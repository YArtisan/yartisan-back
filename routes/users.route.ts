import express, { request } from "express";
import createUserController from "../src/controller/user.controller"

export default function(app: any) {
  const jsonMiddleware = express.json();
  
  app.post('/createUsers', jsonMiddleware, (req, res) => {
    createUserController(req, res)
  });
}