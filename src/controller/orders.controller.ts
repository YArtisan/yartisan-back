import orderService from "../service/order.service"

function createOrder (req: any, res: any) {
    orderService.createOrder(req.body, res);
}

function getAllOrderByArtisant (req: any, res: any) {
    orderService.getAllOrderByArtisant(req.body, res);
}

function getAllOrderByUser (req: any, res: any) {
    orderService.getAllOrderByUser(req.body, res);
}

function updateOrder (req: any, res: any) {
    orderService.updateOrder(req.body, res);
}

export default { createOrder, getAllOrderByArtisant, getAllOrderByUser, updateOrder }