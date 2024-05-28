import { Request, Response } from "express";
import artisantService from "../service/artisant.service.js";
import opening_hoursService from "../service/opening_hours.service.js";
import addressModel from "../models/address.model.js";

function createArtisantController(request: any, res: any) {
  artisantService.createArtisantService(request.body, res);
}

function updateArtisantController(request: any, res: any) {
  artisantService.updateArtisantService(request.body, res);
}

function deleteArtisantController(request: any, res: any) {
  artisantService.deleteArtisantService(request.body, res);
}

async function getArtisanDataController(req: Request, res: Response) {
  try {
    const artisantData = await artisantService.getArtisantDataService(req.params.id);

    if (!artisantData) {
      res.status(400).json({ status: false, message: "Artisant not found" });
      return;
    }

    const artisantOpeningTime = await opening_hoursService.getOpeningHoursByArtisan(
      req.params.id
    );

    const address = await addressModel.find({ _id: artisantData.adress_id });

    const data = {
      artisantData,
      opening_time: artisantOpeningTime,
      address: address,
    };
    

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
