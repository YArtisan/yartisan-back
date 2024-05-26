import artisanSchema from "./../models/artisant.model.js";
import openingHoursModelSchema from "../models/opening_hours.model.js";
import ratingSchema from "../models/rating.model.js";
import addressSchema from "../models/address.model.js";
import { artisantDto } from "./../dto/artisant.dto.js";
import usersModel from "../models/users.model.js";

async function createArtisantService(
  request: artisantDto,
  res: any
): Promise<void> {
  try {
    const emailFound = await artisanSchema.findOne({
      email: request.email,
    });

    const companyNameFound = await artisanSchema.findOne({
      company_name: request.company_name,
    });

    if (emailFound || companyNameFound) {
      res
        .status(400)
        .json({ status: false, message: "This account already exists" });
    } else {
      const newArtisant = new artisanSchema({
        email: request.email,
        password: request.password ?? "empty",
        company_name: request.company_name,
        phone_number: request.phone_number,
        profile_picture: request.profile_picture,
        job_description: request.job_description,
        number_of_employees: request.number_of_employees,
        isVisible: request.isVisible,
        average_price: request.average_price,
      });

      await newArtisant.save();

      const newAdress = new addressSchema({
        id: newArtisant.adress_id,
        address_number: request.address?.address_number,
        city: request.address?.city,
        street_name: request.address?.street_name,
        postal_code: request.address?.postal_code,
        country: request.address?.country,
        lat: request.address?.lat,
        lon: request.address?.lon,
      });

      await newAdress.save();

      if (request.opening_hours && request.opening_hours.length > 0) {
        for (const day of request.opening_hours) {
          const newOpeningHoursModel = new openingHoursModelSchema({
            artisant_id: newArtisant._id,
            day_of_week: day.day_of_week,
            opening_time: day.opening_time,
            closing_time: day.closing_time,
          });

          await newOpeningHoursModel.save();
        }
      }

      if (newArtisant) {
        res
          .status(200)
          .json({ status: true, message: "Artisant successfully creates" });
      } else {
        res
          .status(400)
          .json({ status: false, message: "Cannot creates this artisant" });
      }
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
}

async function updateArtisantService(
  request: artisantDto,
  res: any
): Promise<void> {
  try {
    const artistantFound = await artisanSchema.findOne({
      _id: request.artisant_id,
    });

    if (!request.artisant_id) {
      res
        .status(400)
        .json({ status: false, message: "Artisan id is undefined" });
      return;
    }

    if (artistantFound) {
      const updatedData = {
        company_name: request.company_name,
        phone_number: request.phone_number,
        profile_picture: request.profile_picture,
        job_description: request.job_description,
        average_price: request.average_price,
        number_of_employees: request.number_of_employees,
        isVisible: request.isVisible,
      };

      await artisanSchema.findOneAndUpdate(
        { _id: request.artisant_id },
        updatedData
      );
      res
        .status(200)
        .json({ status: true, message: "Artisan successfully updated" });
    } else {
      res
        .status(400)
        .json({ status: false, message: "This artisant does not exist" });
    }
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}

async function deleteArtisantService(
  request: artisantDto,
  res: any
): Promise<void> {
  try {
    if (!request.artisant_id) {
      res
        .status(400)
        .json({ status: false, message: "Artisan id is undefined" });
      return;
    }

    const artistantFound = await artisanSchema.findOne({
      _id: request.artisant_id,
    });

    if (artistantFound) {
      await artisanSchema.deleteOne({ _id: request.artisant_id });
    } else {
      res
        .status(400)
        .json({ status: false, message: "Artisant does not exist" });
      return;
    }

    res
      .status(200)
      .json({ status: true, message: "Artisan delete with sucess" });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}

async function getArtisantDataService(
  artisan_id: string
): Promise<artisantDto> {
  return new Promise((resolve, reject) => {
    artisanSchema
      .findOne({
        _id: artisan_id,
      })
      .lean()
      .then((e) => resolve(e as artisantDto))
      .catch(reject);
  });
}

async function getAllArtisansDataService(res: any): Promise<void> {
  try {
    const artisanData = await artisanSchema.find({});

    if (!artisanData || artisanData.length === 0) {
      res.status(400).json({ status: false, message: "No artisans found" });
      return;
    }

    // Récupérer les données des horaires d'ouverture et des rating pour chaque artisan
    const artisansWithOpeningAndRating = await Promise.all(
      artisanData.map(async (artisan) => {
        const openingHours = await openingHoursModelSchema.find({
          artisant_id: artisan._id,
        });
        const ratings = await ratingSchema.find({ artisant_id: artisan._id });
        const ratingsWithUser = await Promise.all(
          ratings.map(async (rating) => {
            const user = await usersModel.findById(rating.user_id);
            return {
              ...rating.toObject(),
              user: { firstName: user?.firstname, lastname: user?.lastname },
            };
          })
        );
        const address = await addressSchema.find({ _id: artisan.adress_id });

        return {
          artisantData: artisan,
          opening_time: openingHours,
          ratings: ratingsWithUser,
          address: address,
        };
      })
    );

    res.status(200).json({ status: true, data: artisansWithOpeningAndRating });
  } catch (error: any) {
    console.log("error", error);
    res.status(500).json({ status: false, message: error.message });
  }
}

export default {
  createArtisantService,
  updateArtisantService,
  deleteArtisantService,
  getArtisantDataService,
  getAllArtisansDataService,
};
