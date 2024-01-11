import ordersSchema from "../models/order.model";
import usersSchema from "../models/users.model.js";
async function createOrder(req, res) {
    const userFound = await usersSchema.findOne({ _id: req.user_id });
    if (userFound) {
        const newOrder = new ordersSchema({
            user_id: req.user_id,
            artisant_id: req.artisant_id,
            title: req.title,
            description: req.description,
            price: req.price,
            start_date_order: req.start_date_order,
            finish_date_order: req.finish_date_order,
            status: req.status,
            isFinish: req.isFinish,
            createdAt: req.createdAt
        });
        newOrder.save();
        if (newOrder) {
            res.status(200).json({ status: true, message: "Order send" });
            return;
        }
        else {
            res.status(400).json({ status: false, message: "Cannot save this order" });
            return;
        }
    }
    else {
        res.status(404).json({ status: false, message: "Cannot found this user" });
        return;
    }
}
async function getAllOrderByUser(req, res) {
    const allUserOrder = await ordersSchema.find({ user_id: req.user_id });
    if (allUserOrder) {
        res.status(200).json({ status: true, data: allUserOrder });
    }
    else {
        res.status(404).json({ status: false, message: "Cannot found all orders from this user" });
    }
}
async function getAllOrderByArtisant(req, res) {
    const allUserOrder = await ordersSchema.find({ artisant_id: req.artisant_id });
    if (allUserOrder) {
        res.status(200).json({ status: true, data: allUserOrder });
    }
    else {
        res.status(404).json({ status: false, message: "Cannot found all orders from this artisant" });
    }
}
async function updateOrder(req, res) {
    try {
        const updatedData = {
            user_id: req.user_id,
            artisant_id: req.artisant_id,
            title: req.title,
            description: req.description,
            price: req.price,
            start_date_order: req.start_date_order,
            finish_date_order: req.finish_date_order,
            status: req.status,
            isFinish: req.isFinish,
            createdAt: req.createdAt
        };
        await ordersSchema.updateOne({ id: req.artisant_id }, updatedData);
        res.status(200).json({ status: true, message: "Order updated successfully" });
    }
    catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}
export default { createOrder, getAllOrderByUser, getAllOrderByArtisant, updateOrder };
//# sourceMappingURL=order.service.js.map