import express from "express";
import userController from "./../controller/user.controller.js";
export default function (app) {
    const jsonMiddleware = express.json();
    app.post("/users/signup", jsonMiddleware, (req, res) => {
        userController.createUserController(req, res);
    });
    app.post("/users/update", jsonMiddleware, (req, res) => {
        userController.updateUserController(req, res);
    });
    app.post("/users/delete", jsonMiddleware, (req, res) => {
        userController.deleteUserController(req, res);
    });
    app.post("/users/get-data", jsonMiddleware, (req, res) => {
        userController.getUserDataController(req, res);
    });
}
//# sourceMappingURL=users.route.js.map