import express from "express";
import oauthController from "../controller/oauth.controller.js";
export default function (app) {
    const jsonMiddleware = express.json();
    app.post("/users/signin", jsonMiddleware, (req, res) => {
        oauthController.signinUserController(req, res);
    });
    app.post("/artisant/signin", jsonMiddleware, (req, res) => {
        oauthController.signinArtisantController(req, res);
    });
}
//# sourceMappingURL=oauth.route.js.map