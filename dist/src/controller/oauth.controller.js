import artisantService from "../service/artisant.service.js";
function signinUserController(request, res) {
    artisantService.createArtisantService(request.body, res);
}
function signupUserController(request, res) {
    artisantService.updateArtisantService(request.body, res);
}
function signinArtisantController(request, res) {
    artisantService.updateArtisantService(request.body, res);
}
function signupArtisantController(request, res) {
    artisantService.updateArtisantService(request.body, res);
}
export default {
    signinUserController,
    signupUserController,
    signinArtisantController,
    signupArtisantController
};
//# sourceMappingURL=oauth.controller.js.map