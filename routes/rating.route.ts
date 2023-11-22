import express, { request } from "express";
import ratingController from "../src/controller/rating.controller.js";

export default function(app: any) {
  const jsonMiddleware = express.json();
  
  app.post('/new-rating', jsonMiddleware, (req: { body: any; }, res: any) => {
    ratingController.ratingServiceController(req, res)
  });

  app.post('/all-user-rating', jsonMiddleware, (req: { body: any; }, res: any) => {
    ratingController.getAllUserRatingController(req, res)
  });

  app.post('/all-artisant-rating', jsonMiddleware, (req: { body: any; }, res: any) => {
    ratingController.getAllArtisantRatingController(req, res)
  });
}