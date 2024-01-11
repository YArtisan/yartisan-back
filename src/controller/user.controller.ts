import userService from "../service/user.service.js"

function createUserController (request: any, res: any) {
	userService.createUserService(request.body, res)
}
function updateUserController (request: any, res: any) {
	userService.updateUserService(request.body, res)
}
function deleteUserController (request: any, res: any) {
	userService.deleteUserService(request.body, res)
}
function getUserDataController (request: any, res: any) {
	userService.getUserDataService(request.body, res)
}

export default { createUserController, updateUserController, deleteUserController, getUserDataController }