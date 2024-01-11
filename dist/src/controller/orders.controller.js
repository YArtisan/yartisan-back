import orderService from "../service/order.service";
function createOrder(req, res) {
    orderService.createOrder(req.body, res);
}
function getAllOrderByArtisant(req, res) {
    orderService.getAllOrderByArtisant(req.body, res);
}
function getAllOrderByUser(req, res) {
    orderService.getAllOrderByUser(req.body, res);
}
function updateOrder(req, res) {
    orderService.updateOrder(req.body, res);
}
export default { createOrder, getAllOrderByArtisant, getAllOrderByUser, updateOrder };
//# sourceMappingURL=orders.controller.js.map