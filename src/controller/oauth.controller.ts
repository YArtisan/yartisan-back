import artisantService from "../service/artisant.service";

function signinUserController(request: any, res: any) {
  artisantService.createArtisantService(request.body, res);
}

function signupUserController(request: any, res: any) {
  artisantService.updateArtisantService(request.body, res);
}

function signinArtisantController(request: any, res: any) {
  artisantService.updateArtisantService(request.body, res);
}

function signupArtisantController(request: any, res: any) {
  artisantService.updateArtisantService(request.body, res);
}

export default {
  signinUserController,
  signupUserController,
  signinArtisantController,
  signupArtisantController
};
