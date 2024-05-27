import ordersController from "../controller/orders.controller.js";

export default function (app: any) {
  app.post("/order/create", (req: any, res: any) => {
    ordersController.createOrder(req, res);
  });

  app.get("/order/all-user-order", (req: any, res: any) => {
    ordersController.getAllOrderByUser(req, res);
  });

  app.get("/order/all-artisan-order", (req: any, res: any) => {
    ordersController.getAllOrderByArtisant(req, res);
  });

  app.put("/order/:id", (req: any, res: any) => {
    ordersController.updateOrder(req, res);
  });

  app.put("/order/stripeId/:stripeId", (req: any, res: any) => {
    ordersController.updateOrderByStripeId(req, res);
  });
}
