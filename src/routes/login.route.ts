import express from "express";
import userController from "./../controller/user.controller.js";


export default function (app: any) {

	const jsonMiddleware = express.json();

	app.post('/register', jsonMiddleware, (req: Request, res: Response) => {
		userController.createUserController(req, res);
	});

	app.post('/login', jsonMiddleware, (req: Request, res: Response) => {
		userController.getUserDataController(req, res);
	});
}