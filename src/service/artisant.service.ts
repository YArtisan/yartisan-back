import artisanSchema from "./../models/artisant.model";
import { artisantDto } from './../dto/artisant.dto'

async function createArtisantService(request: artisantDto, res: any): Promise<void> {
  const emailFound = await artisanSchema.findOne({
    email: request.email,
  });

  const compagnyNameFound = await artisanSchema.findOne({
    compagny_name: request.compagny_name,
  });

  if (emailFound || compagnyNameFound) {
    res.status(400).json({ status: false, message: "This account already exists" });
  } else {
    const newArtisant = new artisanSchema({
      compagny_name: request.compagny_name,
      phone_number: request.phone_number,
      profile_picture: request.profile_picture,
      job_description: request.job_description,
      number_of_employees: request.number_of_employees,
    });

    newArtisant.save();
    res.status(200).json({ status: true, message: "Artisant successfully creates" });
  }
}

async function updateArtisantService(request: artisantDto, res: any): Promise<void> {
  try {
    const artistantFound = await artisanSchema.findOne({
      _id: request.artisant_id,
    });

    if (!request.artisant_id) {
      res.status(400).json({ status: false, message: "Artisan id is undefined" });
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
      res.status(200).json({ status: true, message: "Artisan successfully updated" });
    } else {
      res.status(400).json({ status: false, message: "This artisant does not exist" });
    }
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
}

async function deleteArtisantService(request: artisantDto, res: any): Promise<void> {
  try {
    if (!request.artisant_id) {
      res.status(400).json({ status: false, message: "Artisan id is undefined" });
      return
    }

    const artistantFound = await artisanSchema.findOne({
      _id: request.artisant_id,
    });

    if (artistantFound) {
      await artisanSchema.deleteOne({ _id: request.artisant_id });
    } else {
      res.status(400).json({ status: false, message: "Artisant does not exist" });
      return
    }

    res.status(200).json({ status: true, message: "Artisan delete with sucess" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
}

async function getArtisantDataService(request: artisantDto, res: any): Promise<void> {
  try {
    const artisantData = await artisanSchema.findOne({ _id: request.artisant_id });

    if (!artisantData) {
      res.status(400).json({ status: false, message: "Artisant not found" });
      return;
    }

    res.status(200).json({ status: true, data: artisantData });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
}

async function getAllArtisansDataService(res: any): Promise<void> {
  try {
    const artisanData = await artisanSchema.find({});

    if (!artisanData || artisanData.length === 0) {
      res.status(400).json({ status: false, message: "No artisans found" });
      return;
    }

    res.status(200).json({ status: true, data: artisanData });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
}

export default { createArtisantService, updateArtisantService, deleteArtisantService, getArtisantDataService };
