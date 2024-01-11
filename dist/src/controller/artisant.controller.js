import artisantService from "../service/artisant.service.js";
function createArtisantController(request, res) {
    artisantService.createArtisantService(request.body, res);
}
function updateArtisantController(request, res) {
    artisantService.updateArtisantService(request.body, res);
}
function deleteArtisantController(request, res) {
    artisantService.deleteArtisantService(request.body, res);
}
function getArtisantDataController(request, res) {
    artisantService.getArtisantDataService(request.body, res);
}
function getAllArtisansDataController(request, res) {
    artisantService.getAllArtisansDataService(res);
}
export default {
    createArtisantController,
    updateArtisantController,
    deleteArtisantController,
    getArtisantDataController,
    getAllArtisansDataController
};
//# sourceMappingURL=artisant.controller.js.map