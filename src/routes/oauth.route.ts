import express from "express";
import oauthController from "../controller/oauth.controller.js";

export default function (app: any) {
  const jsonMiddleware = express.json();

  app.post("/users/signin", jsonMiddleware, (req: any, res: any) => {
    oauthController.signinUserController(req, res);
  });

  app.post("/artisant/signin", jsonMiddleware, (req: any, res: any) => {
    oauthController.signinArtisantController(req, res);
  });
}
