import orderService from "../service/order.service.js";

async function createOrder(req: any, res: any) {
  const order = await orderService.createOrder(req.body);
  if (order) {
    res.status(200).json({ status: true, message: "Order sent" });
    return;
  } else {
    res.status(400).json({ status: false, message: "Cannot save this order" });
    return;
  }
}

async function getAllOrderByArtisant(req: any, res: any) {
  const allArtisanOrder = await orderService.getAllOrderByArtisan(req.user._id);

  if (allArtisanOrder) {
    res.status(200).json({ status: true, data: allArtisanOrder });
  } else {
    res.status(404).json({
      status: false,
      message: "Cannot found all orders from this artisan",
    });
  }
}

async function getAllOrderByUser(req: any, res: any) {
  const allUserOrder = await orderService.getAllOrderByUser(req.user._id);

  if (allUserOrder) {
    res.status(200).json({ status: true, data: allUserOrder });
  } else {
    res.status(404).json({
      status: false,
      message: "Cannot found all orders from this user",
    });
  }
}

async function updateOrder(req: any, res: any) {
  try {
    await orderService.updateOrder(req.params.id, req.body);

    res
      .status(200)
      .json({ status: true, message: "Order updated successfully" });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}

async function updateOrderByStripeId(req: any, res: any) {
  try {
    await orderService.updateOrderByStripeId(req.params.stripeId, req.body);

    res
      .status(200)
      .json({ status: true, message: "Order updated successfully" });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}

export default {
  createOrder,
  getAllOrderByArtisant,
  getAllOrderByUser,
  updateOrder,
  updateOrderByStripeId,
};
