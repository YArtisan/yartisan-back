import express from "express";
import ordersController from '../controller/orders.controller';
export default function (app) {
    const jsonMiddleware = express.json();
    app.post('/order/create', jsonMiddleware, (req, res) => {
        ordersController.createOrder(req, res);
    });
    app.get('/order/all-user-order', jsonMiddleware, (req, res) => {
        ordersController.getAllOrderByUser(req, res);
    });
    app.get('/order/all-artisant-order', jsonMiddleware, (req, res) => {
        ordersController.getAllOrderByArtisant(req, res);
    });
}
//# sourceMappingURL=order.route.js.map