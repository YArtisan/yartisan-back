import ratingSchema from "./../../models/rating.model";
import usersSchema from "../../models/users.model";
import { RatingDto } from "./../dto/rating.dto";
import express, { Request, Response } from "express";

async function setRatingService(request: RatingDto, res: Response) {
	const userFound = await usersSchema.findOne({ _id: request.user_id });
	// const artisantFound = await ratingModel.findOne({ id: request.user_id });

	if (userFound) {
		const newRating = new ratingSchema(
			{
				user_id: request.user_id,
				artisant_id: request.artisant_id,
				score: request.score,
				avis: request.avis,
			}
		);

		newRating.save();

		if (newRating) {
			res.status(200).json({ message: "Rating send !" });
			return;
		} else {
			res.status(404).json({ message: "Cannot save this rating..." });
			return;
		}
	} else {
		res.status(404).json({ message: "Cannot found this user..." });
		return;
	}
}

export default { setRatingService };
