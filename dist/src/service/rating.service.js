import ratingSchema from "../models/rating.model.js";
import usersSchema from "../models/users.model.js";
async function createRatingService(request, res) {
    const userFound = await usersSchema.findOne({ _id: request.user_id });
    if (userFound) {
        const newRating = new ratingSchema({
            user_id: request.user_id,
            artisant_id: request.artisant_id,
            score: request.score,
            avis: request.avis,
        });
        newRating.save();
        if (newRating) {
            res.status(200).json({ status: true, message: "Rating send" });
            return;
        }
        else {
            res.status(400).json({ status: false, message: "Cannot save this rating" });
            return;
        }
    }
    else {
        res.status(404).json({ status: false, message: "Cannot found this user" });
        return;
    }
}
async function getAllUserRating(request, res) {
    const allUserRating = await ratingSchema.find({ user_id: request.user_id });
    if (allUserRating) {
        res.status(200).json({ status: true, data: allUserRating });
    }
    else {
        res.status(404).json({ status: false, message: "Cannot found all rating from this user" });
    }
}
async function getAllArtisantRating(request, res) {
    const allArtisantRating = await ratingSchema.find({ artisant_id: request.artisant_id });
    if (allArtisantRating) {
        res.status(200).json({ status: true, data: allArtisantRating });
    }
    else {
        res.status(404).json({ status: false, message: "Cannot found all rating from this artisant" });
    }
}
export default { createRatingService, getAllUserRating, getAllArtisantRating };
//# sourceMappingURL=rating.service.js.map