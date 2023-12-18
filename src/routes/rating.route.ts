import express, { request } from "express";
import ratingController from "./../controller/rating.controller.js";

export default function (app: any) {
  const jsonMiddleware = express.json();

  app.post('rating/new', jsonMiddleware, (req: any, res: any) => {
    ratingController.createRatingServiceController(req, res)
  });

  app.post('rating/all-user-rating', jsonMiddleware, (req: any, res: any) => {
    ratingController.getAllUserRatingController(req, res)
  });

  app.post('rating/all-artisant-rating', jsonMiddleware, (req: any, res: any) => {
    ratingController.getAllArtisantRatingController(req, res)
  });
}