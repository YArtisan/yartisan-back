import ratingSchema from "../models/rating.model.js";
import usersSchema from "../models/users.model.js";
import { ratingDto } from "./../dto/rating.dto.js";
import express, { Request, Response } from "express";

async function createRatingService(request: ratingDto, res: Response) {
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
		} else {
			res.status(400).json({ status: false, message: "Cannot save this rating" });
			return;
		}
	} else {
		res.status(404).json({ status: false, message: "Cannot found this user" });
		return;
	}
}

async function getAllUserRating(request: ratingDto, res: Response) {
	const allUserRating = await ratingSchema.find({ user_id: request.user_id })

	if (allUserRating) {
		res.status(200).json({ status: true, data: allUserRating });
	} else {
		res.status(404).json({ status: false, message: "Cannot found all rating from this user" });
	}
}

async function getAllArtisantRating(request: ratingDto, res: Response) {
	const allArtisantRating = await ratingSchema.find({ artisant_id: request.artisant_id })

	if (allArtisantRating) {
		res.status(200).json({ status: true, data: allArtisantRating });
	} else {
		res.status(404).json({ status: false, message: "Cannot found all rating from this artisant" });
	}
}

export default { createRatingService, getAllUserRating, getAllArtisantRating };
