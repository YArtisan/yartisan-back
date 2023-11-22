import ratingService from "../service/rating.service"

function ratingServiceController(request: any, res: any) {
	ratingService.setRatingService(request.body, res)
}

export default { ratingServiceController }