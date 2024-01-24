import express from "express";
import likeController from "../controller/like.controller";

export default function (app: express.Application) {
  const jsonMiddleware = express.json();

  // Routes pour les likes
  app.post("/create-Like", jsonMiddleware, (req: express.Request, res: express.Response) => {
    likeController.createLikeController(req, res);
  });

  app.post("/update-Like", jsonMiddleware, (req: express.Request, res: express.Response) => {
    likeController.updateLikeController(req, res);
  });

  app.post("/delete-Like", jsonMiddleware, (req: express.Request, res: express.Response) => {
    likeController.deleteLikeController(req, res);
  });

  app.post("/getLikeData", jsonMiddleware, (req: express.Request, res: express.Response) => {
    likeController.getLikeDataController(req, res);
  });
}
