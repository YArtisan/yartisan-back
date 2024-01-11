import userService from "../service/user.service.js";
function createUserController(request, res) {
    userService.createUserService(request.body, res);
}
function updateUserController(request, res) {
    userService.updateUserService(request.body, res);
}
function deleteUserController(request, res) {
    userService.deleteUserService(request.body, res);
}
function getUserDataController(request, res) {
    userService.getUserDataService(request.body, res);
}
export default { createUserController, updateUserController, deleteUserController, getUserDataController };
//# sourceMappingURL=user.controller.js.map