import express from "express";
import artisantController from "./../controller/artisant.controller.js";
export default function (app) {
    const jsonMiddleware = express.json();
    app.post("/artisant/signup", jsonMiddleware, (req, res) => {
        artisantController.createArtisantController(req, res);
    });
    app.post("/artisant/update", jsonMiddleware, (req, res) => {
        artisantController.updateArtisantController(req, res);
    });
    app.post("/artisant/delete", jsonMiddleware, (req, res) => {
        artisantController.deleteArtisantController(req, res);
    });
    app.post("/artisant/get-data-from-a-artisant", jsonMiddleware, (req, res) => {
        artisantController.getArtisantDataController(req, res);
    });
    app.get("/artisant/get-all-artisant", jsonMiddleware, (req, res) => {
        artisantController.getAllArtisansDataController(req, res);
    });
}
//# sourceMappingURL=artisant.route.js.map