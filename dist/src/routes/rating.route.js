import express from "express";
import ratingController from "./../controller/rating.controller.js";
export default function (app) {
    const jsonMiddleware = express.json();
    app.post('/rating/new', jsonMiddleware, (req, res) => {
        ratingController.createRatingServiceController(req, res);
    });
    app.post('/rating/all-user-rating', jsonMiddleware, (req, res) => {
        ratingController.getAllUserRatingController(req, res);
    });
    app.post('/rating/all-artisant-rating', jsonMiddleware, (req, res) => {
        ratingController.getAllArtisantRatingController(req, res);
    });
}
//# sourceMappingURL=rating.route.js.map