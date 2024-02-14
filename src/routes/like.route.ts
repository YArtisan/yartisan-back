import express from "express";
import likeController from "../controller/like.controller";

export default function (app: any) {
  const jsonMiddleware = express.json();

  app.post("/like/create-like", jsonMiddleware, (req: any, res: any) => {
    likeController.createLikeController(req, res);
  });

  app.delete("/like/delete-like", jsonMiddleware, (req: any, res: any) => {
    likeController.deleteLikeController(req, res);
  });

  app.get("/likes/user/:userId", (req: any, res: any) => {
    likeController.getLikesByUserController(req, res);
  });

  app.get("/likes/artisan/:artisanId", (req: any, res: any) => {
    likeController.getLikesByArtisanController(req, res);
  });
}
