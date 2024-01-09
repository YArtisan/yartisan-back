import artisantService from "../service/artisant.service.js";

function createArtisantController(request: any, res: any) {
	artisantService.createArtisantService(request.body, res);
}

function updateArtisantController(request: any, res: any) {
	artisantService.updateArtisantService(request.body, res);
}

function deleteArtisantController(request: any, res: any) {
	artisantService.deleteArtisantService(request.body, res);
}

function getArtisantDataController(request: any, res: any) {
	artisantService.getArtisantDataService(request.body, res);
}

function getAllArtisansDataController(request: any, res: any) {
	artisantService.getAllArtisansDataService(res)
}

export default {
	createArtisantController,
	updateArtisantController,
	deleteArtisantController,
	getArtisantDataController,
	getAllArtisansDataController
};
