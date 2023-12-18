import ratingService from "../service/rating.service.js"

function createRatingServiceController(request: any, res: any) {
	ratingService.createRatingService(request.body, res)
}

function getAllUserRatingController(request: any, res: any) {
	ratingService.getAllUserRating(request.body, res)
}

function getAllArtisantRatingController(request: any, res: any) {
	ratingService.getAllArtisantRating(request.body, res)
}

export default { createRatingServiceController, getAllUserRatingController, getAllArtisantRatingController }