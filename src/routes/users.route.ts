import express, { request } from "express";
import userController from "../controller/user.controller"

export default function(app: any) {
  const jsonMiddleware = express.json();
  
  app.post('/create-users', jsonMiddleware, (req: any, res: any) => {
    userController.createUserController(req, res)
  });
  app.post('/update-user', jsonMiddleware, (req: any, res: any) => {
    userController.updateUserController(req, res)
  });
  app.post('/deleteUser' , jsonMiddleware, (req: any, res: any) => {
    userController.deleteUserController(req, res)
  });
  app.post('/getUserData' , jsonMiddleware, (req: any, res: any) => {
    userController.getUserDataController(req, res)
  });
}