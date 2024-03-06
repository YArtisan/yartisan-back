import { Request, Response } from "express";
import artisantService from "../service/artisant.service.js";
import opening_hoursService from "../service/opening_hours.service.js";

function createArtisantController(request: any, res: any) {
  artisantService.createArtisantService(request.body, res);
}

function updateArtisantController(request: any, res: any) {
  artisantService.updateArtisantService(request.body, res);
}

function deleteArtisantController(request: any, res: any) {
  artisantService.deleteArtisantService(request.body, res);
}

function getArtisanDataController(req: Request, res: Response) {
  try {
    const artisantData = artisantService.getArtisantDataService(req.params.id);

    if (!artisantData) {
      res.status(400).json({ status: false, message: "Artisant not found" });
      return;
    }

    const artisantOpeningTime = opening_hoursService.getOpeningHoursByArtisan(
      req.params.id
    );

    const data = { artisantData, artisantOpeningTime };

    res.status(200).json({ status: true, data });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}

function getAllArtisansDataController(_req: any, res: any) {
  artisantService.getAllArtisansDataService(res);
}

export default {
  createArtisantController,
  updateArtisantController,
  deleteArtisantController,
  getArtisanDataController,
  getAllArtisansDataController,
};
