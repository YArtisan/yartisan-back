import artisanSchema from "../models/artisant.model";
import { createArtisantdto } from "../dto/artisant.dto";

async function createArtisantService(
  request: createArtisantdto,
  res: any
): Promise<void> {
  const compagny_namefound = await artisanSchema.findOne({
    compagny_name: request.compagny_name,
  });
  const phone_numberfound = await artisanSchema.findOne({
    phone_number: request.phone_number,
  });
  const profile_picturefound = await artisanSchema.findOne({
    profile_picture: request.profile_picture,
  });
  if (compagny_namefound || phone_numberfound || profile_picturefound) {
    res.status(400).json("Error...");
  } else {
    const newArtisant = new artisanSchema({
      userid: Number,
      compagny_name: request.compagny_name,
      phone_number: request.phone_number,
      profile_picture: request.profile_picture,
      job_description: request.job_description,
      average_price: request.average_price,
      number_of_employees: request.number_of_employees,
      isVisible: request.isVisible,
      created_at: request.created_at,
      last_update: request.last_update,
    });
    newArtisant.save();

    res.status(200).json("Save into Db !");
  }
}

async function updateArtisantService(request: any, res: any): Promise<void> {
  try {
    const userId = request.userId;

    const updatedData = {
      userid: Number,
      compagny_name: request.compagny_name,
      phone_number: request.phone_number,
      profile_picture: request.profile_picture,
      job_description: request.job_description,
      average_price: request.average_price,
      number_of_employees: request.number_of_employees,
      isVisible: request.isVisible,
      created_at: request.created_at,
      last_update: request.last_update,
    };

    await artisanSchema.findOneAndUpdate({ id: userId }, updatedData);

    res.status(200).json("Artisant updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteArtisantService(request: any, res: any): Promise<void> {
  try {
    const userId = request.userId;

    // Supprimer l'artisan
    await artisanSchema.deleteOne({ _id: userId });

    res.status(200).json("Artisan supprimé avec succès");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getArtisantDataService(request: any, res: any): Promise<void> {
  try {
    const userId = request.userId;

    const artisantData = await artisanSchema.findOne({ _id: userId });

    if (!artisantData) {
      res.status(404).json("Artisan non trouvé");
      return;
    }

    res.status(200).json(artisantData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default { createArtisantService, updateArtisantService, deleteArtisantService, getArtisantDataService };
