import express from "express";
import artisantController from "./../controller/artisant.controller.js";

export default function (app: any) {
  const jsonMiddleware = express.json();

  app.post("artisant/signup", jsonMiddleware, (req: any, res: any) => {
    artisantController.createArtisantController(req, res);
  });

  app.post("artisant/update", jsonMiddleware, (req: any, res: any) => {
    artisantController.updateArtisantController(req, res);
  });
  
  app.post("artisant/delete", jsonMiddleware, (req: any, res: any) => {
    artisantController.deleteArtisantController(req, res);
  });

  app.post("artisant/get-data-from-a-artisant", jsonMiddleware, (req: any, res: any) => {
    artisantController.getArtisantDataController(req, res);
  });

  app.post("artisant/get-all-artisant", jsonMiddleware, (req: any, res: any) => {
    artisantController.getAllArtisansDataController(req, res);
  });
}
