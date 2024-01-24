import likeService from "../service/like.service";

function createLikeController(request: any, res: any): void {
  try {
    likeService.createLike(request.body, res);
  } catch (error) {
    console.error("Erreur dans createLikeController :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la création du like." });
  }
}

function deleteLikeController(request: any, res: any): void {
  try {
    likeService.deleteLike(request.body, res);
  } catch (error) {
    console.error("Erreur dans deleteLikeController :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression du like." });
  }
}

function getLikesByUserController(request: any, res: any): void {
  try {
    likeService.getLikesByUserId(request.params.userId, res);
  } catch (error) {
    console.error("Erreur dans getLikesByUserController :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des likes de l'utilisateur." });
  }
}

function getLikesByArtisanController(request: any, res: any): void {
  try {
    likeService.getLikesByArtisanId(request.params.artisanId, res);
  } catch (error) {
    console.error("Erreur dans getLikesByArtisanController :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des likes de l'artisan." });
  }
}

export default { createLikeController, deleteLikeController, getLikesByUserController, getLikesByArtisanController };
