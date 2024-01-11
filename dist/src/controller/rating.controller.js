import ratingService from "../service/rating.service.js";
function createRatingServiceController(request, res) {
    ratingService.createRatingService(request.body, res);
}
function getAllUserRatingController(request, res) {
    ratingService.getAllUserRating(request.body, res);
}
function getAllArtisantRatingController(request, res) {
    ratingService.getAllArtisantRating(request.body, res);
}
export default { createRatingServiceController, getAllUserRatingController, getAllArtisantRatingController };
//# sourceMappingURL=rating.controller.js.map