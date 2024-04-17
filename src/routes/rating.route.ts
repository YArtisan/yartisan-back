import ratingController from "./../controller/rating.controller.js";

export default function (app: any) {
  app.post("/rating/new", (req: any, res: any) => {
    ratingController.createRatingServiceController(req, res);
  });

  app.post("/rating/all-user-rating", (req: any, res: any) => {
    ratingController.getAllUserRatingController(req, res);
  });

  app.post("/rating/all-artisant-rating", (req: any, res: any) => {
    ratingController.getAllArtisantRatingController(req, res);
  });
}
