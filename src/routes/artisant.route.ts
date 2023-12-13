import express from "express";
import artisantController from "./../controller/artisant.controller";

export default function (app: any) {
  const jsonMiddleware = express.json();

  app.post("/create-artisant", jsonMiddleware, (req: any, res: any) => {
    artisantController.createArtisantController(req, res);
  });

  app.post("/update-artisant", jsonMiddleware, (req: any, res: any) => {
    artisantController.updateArtisantController(req, res);
  });
  
  app.post("/delete-artisant", jsonMiddleware, (req: any, res: any) => {
    artisantController.deleteArtisantController(req, res);
  });

  app.post("/get-artisant-data", jsonMiddleware, (req: any, res: any) => {
    artisantController.getArtisantDataController(req, res);
  });
}
