import ratingSchema from "../models/rating.model";
import usersSchema from "../models/users.model";
import { ratingDto } from "./../dto/rating.dto";
import express, { Request, Response } from "express";

async function setRatingService(request: ratingDto, res: Response) {
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
			res.status(200).json("Rating send !");
			return;
		} else {
			res.status(404).json("Cannot save this rating...");
			return;
		}
	} else {
		res.status(404).json("Cannot found this user...");
		return;
	}
}

async function getAllUserRating(request: ratingDto, res: Response) {
	const allUserRating = await ratingSchema.find({ user_id: request.user_id })

	if (allUserRating) {
		res.status(200).send(allUserRating)
	} else {
		res.status(404).json('Cannot found all rating from this user')
	}
}

async function getAllArtisantRating(request: ratingDto, res: Response) {
	const allArtisantRating = await ratingSchema.find({ artisant_id: request.artisant_id })

	if (allArtisantRating) {
		res.status(200).send(allArtisantRating)
	} else {
		res.status(404).json('Cannot found all rating from this artisant')
	}
}

export default { setRatingService, getAllUserRating, getAllArtisantRating };
