import express from "express";
import likeController from "../controller/like.controller";

export default function (app: express.Application) {
  const jsonMiddleware = express.json();

  app.post("/like/create-like", jsonMiddleware, (req: express.Request, res: express.Response) => {
    likeController.createLikeController(req, res);
  });

  app.delete("like/delete-like", jsonMiddleware, (req: express.Request, res: express.Response) => {
    likeController.deleteLikeController(req, res);
  });

  app.get("/likes/user/:userId", (req: express.Request, res: express.Response) => {
    likeController.getLikesByUserController(req, res);
  });

  app.get("/likes/artisan/:artisanId", (req: express.Request, res: express.Response) => {
    likeController.getLikesByArtisanController(req, res);
  });
}
