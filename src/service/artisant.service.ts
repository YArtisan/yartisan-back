import artisanSchema from "./../models/artisant.model";
import { artisantDto } from './../dto/artisant.dto'

async function createArtisantService(request: artisantDto, res: any): Promise<void> {
  const compagnyNameFound = await artisanSchema.findOne({
    compagny_name: request.compagny_name,
  });

  const profilePictureFound = await artisanSchema.findOne({
    profile_picture: request.profile_picture,
  });

  if (compagnyNameFound || profilePictureFound) {
    res.status(400).json("Error...");
  } else {
    const newArtisant = new artisanSchema({
      compagny_name: request.compagny_name,
      phone_number: request.phone_number,
      profile_picture: request.profile_picture,
      job_description: request.job_description,
      number_of_employees: request.number_of_employees,
    });

    newArtisant.save();
    res.status(200).json("Save into Db !");
  }
}

async function updateArtisantService(request: artisantDto, res: any): Promise<void> {
  try {
    const artistantFound = await artisanSchema.findOne({
      _id: request.artisant_id,
    });

    if (!request.artisant_id) {
      res.status(400).json("Missing artisant id");
      return
    }

    if (artistantFound) {
      const updatedData = {
        compagny_name: request.compagny_name,
        phone_number: request.phone_number,
        profile_picture: request.profile_picture,
        job_description: request.job_description,
        average_price: request.average_price,
        number_of_employees: request.number_of_employees,
        isVisible: request.isVisible,
      };

      await artisanSchema.findOneAndUpdate({ _id: request.artisant_id }, updatedData);
      res.status(200).json("Artisant updated successfully");
    } else {
      res.status(200).json("This artisant does not exist");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteArtisantService(request: artisantDto, res: any): Promise<void> {
  try {
    if (!request.artisant_id) {
      res.status(400).json("Missing artisant id");
      return
    }

    const artistantFound = await artisanSchema.findOne({
      _id: request.artisant_id,
    });

    if (artistantFound) {
      await artisanSchema.deleteOne({ _id: request.artisant_id });
    } else {
      res.status(400).json("Artisant does not exist");
      return
    }

    res.status(200).json("Artisan delete with sucess");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getArtisantDataService(request: artisantDto, res: any): Promise<void> {
  try {
    const artisantData = await artisanSchema.findOne({ _id: request.artisant_id });

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
