import express, { request } from "express";
import ordersController from '../controller/orders.controller'


export default function (app: any) {
	const jsonMiddleware = express.json();

    app.post('/order/create', jsonMiddleware, (req: any, res: any) => {
        ordersController.createOrder(req, res)
    });

    app.get('/order/all-user-order', jsonMiddleware, (req: any, res: any) => {
        ordersController.getAllOrderByUser(req, res)
    });

    app.get('/order/all-artisant-order', jsonMiddleware, (req: any, res: any) => {
        ordersController.getAllOrderByArtisant(req, res)
    });
}