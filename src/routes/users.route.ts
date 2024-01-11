import express from "express";
import userController from "./../controller/user.controller.js";

export default function (app: any) {
	const jsonMiddleware = express.json();

	app.post("/users/signup", jsonMiddleware, (req: any, res: any) => {
		userController.createUserController(req, res);
	});

	app.post("/users/update", jsonMiddleware, (req: any, res: any) => {
		userController.updateUserController(req, res);
	});

	app.post("/users/delete", jsonMiddleware, (req: any, res: any) => {
		userController.deleteUserController(req, res);
	});

	app.post("/users/get-data", jsonMiddleware, (req: any, res: any) => {
		userController.getUserDataController(req, res);
	});

	app.get('/user', jsonMiddleware, (req: any, res: any) => {
		res.status(200).json({ status: true, data: req.user })
	})
}
