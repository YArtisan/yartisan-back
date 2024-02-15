import artisantController from "./../controller/artisant.controller.js";

export default function (app: any) {
  app.post("/artisant/signup", (req: any, res: any) => {
    artisantController.createArtisantController(req, res);
  });

  app.post("/artisant/update", (req: any, res: any) => {
    artisantController.updateArtisantController(req, res);
  });

  app.post("/artisant/delete", (req: any, res: any) => {
    artisantController.deleteArtisantController(req, res);
  });

  app.get("/artisant/get-all-artisant", (req: any, res: any) => {
    artisantController.getAllArtisansDataController(req, res);
  });

  app.get("/artisant/:id", (req: any, res: any) => {
    artisantController.getArtisanDataController(req, res);
  });
}
