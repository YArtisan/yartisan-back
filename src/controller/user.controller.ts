import Stripe from "stripe";
import userService from "../service/user.service.js";

function createUserController(request: any, res: any, stripe: Stripe) {
  userService.createUserService(request.body, res, stripe);
}
function updateUserController(request: any, res: any) {
  userService.updateUserService(request.body, res);
}
function deleteUserController(request: any, res: any) {
  userService.deleteUserService(request.body, res);
}
async function getUserDataController(request: any, res: any) {
  try {
    const userId = request.user_id;

    const userData = await userService.getUserDataService(userId);

    if (!userData) {
      res.status(404).json({ status: false, message: "User not found" });
      return;
    }

    res.status(200).json({ status: true, data: userData });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}

export default {
  createUserController,
  updateUserController,
  deleteUserController,
  getUserDataController,
};
