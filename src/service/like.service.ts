import LikeModel from "../models/like.model";
import { LikeDto } from "../dto/like.dto";

async function createLike(likeDto: LikeDto, res: any): Promise<void> {
  try {
    const newLike = new LikeModel({
      id: likeDto.id,
      user_id: likeDto.user_id,
      artisan_id: likeDto.artisan_id
    });

    await newLike.save();

    res.status(200).json({ message: "Like enregistré dans la base de données !" });
  } catch (error) {
    console.error("Erreur lors de la création du like :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de l'enregistrement du like." });
  }
}

async function deleteLike(likeDto: LikeDto, res: any): Promise<void> {
  try {
    const likeId = likeDto.id;

    const result = await LikeModel.deleteOne({ id: likeId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Like supprimé avec succès" });
    } else {
      res.status(404).json({ error: "Like non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du like :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression du like." });
  }
}

async function getLikesByUserId (userId: number, res: any): Promise<void> {
  try {
    const userLikes = await LikeModel.find({ user_id: userId });

    res.status(200).json(userLikes);
  } catch (error) {
    console.error("Erreur lors de la récupération des likes de l'utilisateur :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des likes de l'utilisateur." });
  }
}

async function getLikesByArtisanId(artisanId: number, res: any): Promise<void> {
  try {
    const artisanLikes = await LikeModel.find({ artisan_id: artisanId });

    res.status(200).json(artisanLikes);
  } catch (error) {
    console.error("Erreur lors de la récupération des likes de l'artisan :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des likes de l'artisan." });
  }
}

export default { createLike, deleteLike, getLikesByUserId, getLikesByArtisanId };
