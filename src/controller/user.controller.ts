import createUserService from "../service/user.service"

export default function createUserController(request: any, res: any) {
	createUserService(request.body, res)
}