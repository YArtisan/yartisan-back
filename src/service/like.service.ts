import LikeModel from "../models/like.model";
import { CreateLikeDto, UpdateLikeDto } from "../dto/like.dto";
import likeModel from "../models/like.model";

async function createLikeService(request: CreateLikeDto, res: any): Promise<void> {
  try {
    const newLike = new LikeModel({
      userId: request.userId,
      postId: request.postId,
	    password : request.password,
	    email : request.email,
	    address_id : request.address_id,
	    profile_picture : request.profile_picture,
	    last_update : request.last_update
    });

    await newLike.save();

    res.status(200).json("Like saved into the database!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateLikeService(request: UpdateLikeDto, res: any): Promise<void> {
  try {
    const likeId = request.likeId;

    const updatedLike = {
      userId: request.userId,
      postId: request.postId,
	    password : request.password,
	    email : request.email,
	    address_id : request.address_id,
	    profile_picture : request.profile_picture,
	    last_update : request.last_update

    }

    res.status(200).json("Like updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteLikeService(request: any, res: any): Promise<void> {
  try {
    const likeId = request.likeId;

    await LikeModel.deleteOne({ id: likeId });
    res.status(200).json("Like deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getLikeDataService(request: any, res: any): Promise<void> {
  try {
    const likeId = request.likeId;

    const getLikeData = await likeModel.findOne({ id: likeId });

    if (!getLikeData) {
      res.status(404).json("User not found");
      return;
    }

    res.status(200).json("Like data retrieved successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default { createLikeService, updateLikeService, deleteLikeService, getLikeDataService };
