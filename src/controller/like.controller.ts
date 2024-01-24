import likeService from "../service/like.service";

function createLikeController(request: any, res: any): void {
  likeService.createLikeService(request.body, res);
}

function updateLikeController(request: any, any): void {
  likeService.updateLikeService(request.body, any);
}

function deleteLikeController(request: any, res:any): void {
  likeService.deleteLikeService(request.body, res);
}

function getLikeDataController(request: any, res: any): void {
  likeService.getLikeDataService(request.body, res);
}

export default { createLikeController, updateLikeController, deleteLikeController, getLikeDataController };
