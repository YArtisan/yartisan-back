import express from "express";
import artisantController from "../controller/artisant.controller"

export default function (app: any) {
  const jsonMiddleware = express.json();

  // Routes pour les artisans
  app.post("/create-artisant", jsonMiddleware, (req: any, res: any) => {
    artisantController.createArtisantController(req, res);
  });
  app.post("/update-artisant", jsonMiddleware, (req: any, res: any) => {
    artisantController.updateArtisantController(req, res);
  });
  app.post("/deleteArtisant", jsonMiddleware, (req: any, res: any) => {
    artisantController.deleteArtisantController(req, res);
  });
  app.post("/getArtisantData", jsonMiddleware, (req: any, res: any) => {
    artisantController.getArtisantDataController(req, res);
  });
}
