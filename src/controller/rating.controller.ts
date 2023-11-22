import ratingService from "../service/rating.service"

function ratingServiceController(request: any, res: any) {
	ratingService.setRatingService(request.body, res)
}

function getAllUserRatingController(request: any, res: any) {
	ratingService.getAllUserRating(request.body, res)
}

function getAllArtisantRatingController(request: any, res: any) {
	ratingService.getAllArtisantRating(request.body, res)
}

export default { ratingServiceController, getAllUserRatingController, getAllArtisantRatingController }